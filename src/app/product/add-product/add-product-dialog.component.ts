import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from "@angular/material";
import { Color } from "../../color/color.object";
import { ColorService } from "../../color/color.service";
import { Product } from "../product.object";
import { ObjectDanse } from "../../shared/objectDanse";
import { KindService } from "../../kind/kind.service";
import { CategoryService } from "../../category/category.service";
import { TypeService } from "../../type/type.service";
import { BoxService } from "../../box/box.service";
import { SizeService } from "../../size/size.service";
import { SizeQuantity } from "../../shared/sizequantity.object";
import { forEach } from "@angular/router/src/utils/collection";
import { element } from "protractor";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../product.service";
import { PictureService } from "../../picture/picture.service";
import { Picture } from "../../picture/picture.object";
import { Type } from "../../type/type.object";
import { SuperTypeService } from "../../supertype/supertype.service";
import { CloseDialogComponent } from "../../close-dialog/close-dialog.component";

@Component({
    selector: 'add-product-dialog',
    templateUrl: 'add-product-dialog.component.html',
    styleUrls: ['add-product-dialog.component.css']
  })
export class AddProductDialogComponent implements OnInit {

    colors : Array<Color> = [];
    boxes : Array<ObjectDanse> = [];
    kinds : Array<ObjectDanse> = [];
    categories : Array<ObjectDanse> = [];
    types : Array<Type> = [];
    superTypes : Array<ObjectDanse> = [];
    sizes : Array<ObjectDanse> = [];
    sizesNotAttributed : Array<ObjectDanse>=[];
    sizesQuantities : Array<SizeQuantity> = [];
    newSizeQuantity : SizeQuantity;
    product: Product;
    show : boolean;
    allSizesAttributed : boolean;
    htmlText: string;
    path: Array<string>;
    paths: Array<string>;
    unequalQuantity : boolean;
    picturesToDelete : Array<String>;
    constructor(
        public dialogRef: MatDialogRef<AddProductDialogComponent>,
        public kindService : KindService,
        public categoryService : CategoryService,
        public typeService : TypeService,
        public superTypeService : SuperTypeService,
        public boxService : BoxService,
        public sizeService : SizeService,
        public colorService: ColorService,
        public productService : ProductService,
        public pictureService : PictureService,
        @Inject(MAT_DIALOG_DATA) public data: Product, public dialog: MatDialog) {}
    
      ngOnInit(){
        
        this.colorService.getAllColors().subscribe((result:any) => { 
          this.colors=result.data;
        },err => console.error(err));

        this.kindService.getAllKinds().subscribe((result:any) => { 
          this.kinds=result.data;
        },err => console.error(err));

        this.superTypeService.getAllSuperTypes().subscribe((result:any) => { 
          this.superTypes=result.data;
        },err => console.error(err));

        this.categoryService.getAllCategories().subscribe((result:any) => { 
          this.categories=result.data;
        },err => console.error(err));

        this.boxService.getAllBoxes().subscribe((result:any) => { 
          this.boxes=result.data;
        },err => console.error(err));

        
        
        this.path = new Array<string>();
        this.paths = new Array<string>();
        if(this.data != null){
          this.product = this.data;
          
          if(this.product.type!=null && this.product.type.superType.id!=null){     
            this.changeOnSuperType();
          }
          if(this.product.picture!=null){
            this.path.push(encodeURI(this.product.picture));
          }
          this.product.pictures.forEach((element:Picture)=>{
            this.paths.push(encodeURI(element.link));
          });
          
          this.sizeService.getAllSizes().subscribe((result:any) => { 
            this.sizes=result.data;
            this.getSizesNotAttributed();
          }
          ,err => console.error(err));
        }else{
          this.product = new Product();
          this.allSizesAttributed = false;
          this.sizeService.getAllSizes().subscribe((result:any) => { 
            this.sizesNotAttributed=result.data;
            this.sizes=result.data;
          }
          ,err => console.error(err));
        }
        if(this.product.colour == null){
          this.product.colour = new Color();
        }
        if(this.product.category == null){
          this.product.category = new ObjectDanse();
        }
        if(this.product.kind == null){
          this.product.kind = new ObjectDanse();
        }
        if(this.product.box == null){
          this.product.box = new ObjectDanse();
        }
        if(this.product.type == null){
          this.product.type  = new Type();
          this.product.type.superType = new ObjectDanse();
        }
        if(this.product.sizeQuantities == null){
          this.product.sizeQuantities  = new Array<SizeQuantity>();
        }
        if(this.product.pictures==null){
          this.product.pictures = new Array<Picture>();
        }
        this.show=true;
        this.newSizeQuantity = new SizeQuantity();
        this.picturesToDelete = new Array<String>();
        this.changeQuantity();
      }
      getSizesNotAttributed(){
        this.sizesNotAttributed = new Array<ObjectDanse>();
        this.sizes.forEach((size:ObjectDanse)=>{
          if(!this.product.sizeQuantities.find((sizeQuantity:SizeQuantity) => sizeQuantity.idSize === size.id)){
           this.sizesNotAttributed.push(size);
          }
          
          if(this.sizesNotAttributed.length==0){
            this.allSizesAttributed=true;
          }else{
            this.allSizesAttributed=false;
          }
        });
      }  
      onNoClick(): void {
        this.dialogRef.close();
      }
      save(){
        if(this.newSizeQuantity.idSize!=null && this.newSizeQuantity.idSize!=null){
          if(this.product.sizeQuantities==null){
            this.product.sizeQuantities = new Array<SizeQuantity>();
          }
          this.product.sizeQuantities.push(this.newSizeQuantity);
        }
        this.picturesToDelete.forEach((element:any)=>{
          this.pictureService.deletePicture(element).subscribe(element =>{
                
          });
        });
       
        this.dialogRef.close(this.product);
      }
      addRow() {
        this.product.sizeQuantities.push(this.newSizeQuantity);
        this.newSizeQuantity = new SizeQuantity();
        this.getSizesNotAttributed();        
     }
    
      close() {
        this.dialogRef.close();
      }
      
      onUploadFinished(file){
        this.product.picture=file.file.name;
      }
      onRemoved(file){
        this.product.picture=null;
      }

      onUploadPicturesFinished(file){
        var picture = new Picture();
        picture.link=file.file.name;
        this.product.pictures.push(picture);
      }
      onRemovedPictures(file){
        this.product.pictures.forEach((element:Picture)=>{
          if(element.link==decodeURI(file.file.name)){
            if(element.id!=null){
              this.picturesToDelete.push(element.id);
            }else{
              var indexOf = this.product.pictures.indexOf(file.file.name);
              this.product.pictures.splice(indexOf,1);
            }
          }
        })
      }
      onUploadStateChanged(state: boolean){
        if(state){
          this.show=false;
        }else{
          this.show=true;
        }
      }
      changeOnSuperType(){
        this.typeService.getAllTypeBySuperType(this.product.type.superType.id).subscribe((result:any) => { 
          this.types=result.data;
        }
        ,err => console.error(err));;
      }
      deleteDialog(id){
        let object = new ObjectDanse();
        object.id=id;
        object.name="ce produit";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data=object;
        dialogConfig.disableClose=true;
        let dialogRef = this.dialog.open(CloseDialogComponent,dialogConfig);
    
        dialogRef.afterClosed().subscribe(result => {
         if(result !=null){
           this.delete(result.id);
         }
        });
      }

      delete(id){    
        this.productService.deleteProduct(id).subscribe(result =>{
        },err => console.error(err));  
      }

      changeQuantity(){
        if(this.product==null || this.product.totalQuantity== null || this.product.sizeQuantities==null || (this.product.sizeQuantities.length==0 && this.newSizeQuantity.quantity==null)){
          this.unequalQuantity=false;
        }else{
          this.unequalQuantity=true;
          let total=0;
          this.product.sizeQuantities.forEach((sizeQuantity : SizeQuantity)=>{
            total+=sizeQuantity.quantity
          })
          if(this.newSizeQuantity.quantity!=null){
            total+=this.newSizeQuantity.quantity;
          }        
          if(total==this.product.totalQuantity){
            this.unequalQuantity=false;
          }
        }
        
      }
}