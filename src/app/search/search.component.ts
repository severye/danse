import { Component, OnInit } from '@angular/core';
import { Color } from '../color/color.object';
import { ObjectDanse } from '../shared/objectDanse';
import { KindService } from '../kind/kind.service';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../type/type.service';
import { BoxService } from '../box/box.service';
import { SizeService } from '../size/size.service';
import { ColorService } from '../color/color.service';
import { Product } from '../product/product.object';
import { ProductService } from '../product/product.service';
import { SearchProduct } from './search-product.object';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DisplayProductDialogComponent } from '../product/display-product/display-product-dialog.component';
import { BookService } from '../book/book.service';
import { Book } from '../book/book.object';
import { Utils } from '../shared/utils.service';
import { SuperTypeService } from '../supertype/supertype.service';
import { Type } from '../type/type.object';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  colours: Array<Color>;
  kinds: Array<ObjectDanse>;
  types: Array<ObjectDanse>;
  categories: Array<ObjectDanse>;
  boxes: Array<ObjectDanse>;
  products: Array<Product>;
  searchProduct: SearchProduct;
  colorSelected: Map<string, boolean>;
  quantitybook: number;
  superTypes: Array<ObjectDanse>;
  typesOfSuperTypes: Array<Type>;
  wait:boolean;
  check:boolean;
  id:string;
  product:Product;

  constructor(public kindService : KindService,
    public superTypeService : SuperTypeService,
    public utils : Utils,
    public bookService : BookService,
    public categoryService : CategoryService,
    public typeService : TypeService,
    public boxService : BoxService,
    public sizeService : SizeService,
    public colorService: ColorService,public productService: ProductService,public route : ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        if(this.id!=null){
          this.productService.getProductById(this.id).subscribe((result:any) =>{
            this.product = result.data;
            this.openDialog(this.product);
          },err => console.error(err)); 
        }
      
    });
    this.colorService.getAllColors().subscribe((result:any) => { 
      this.colours=result.data;
    },err => console.error(err));

    this.kindService.getAllKinds().subscribe((result:any) => { 
      this.kinds=result.data;
    },err => console.error(err));

    this.superTypeService.getAllSuperTypes().subscribe((result:any) => { 
      this.superTypes=result.data;
    },err => console.error(err));

    this.typeService.getAllTypes().subscribe((result:any) => { 
      this.types=result.data;
    },err => console.error(err));

    this.categoryService.getAllCategories().subscribe((result:any) => { 
      this.categories=result.data;
    },err => console.error(err));

    this.boxService.getAllBoxes().subscribe((result:any) => { 
      this.boxes=result.data;
    },err => console.error(err));

    this.clear();
  }
  clear(){

    this.searchProduct = new SearchProduct();
    this.searchProduct.available = false;
    this.searchProduct.categories = new Array<ObjectDanse>();
    this.searchProduct.types = new Array<Type>();
    this.searchProduct.kinds = new Array<ObjectDanse>();
    this.searchProduct.boxes = new Array<ObjectDanse>();
    this.searchProduct.superTypes = new Array<ObjectDanse>();
    this.searchProduct.colours = new Array<Color>();
    this.typesOfSuperTypes = new Array<Type>();
    this.colorSelected = new Map<string,boolean>();
    this.searchProduct.quantity = null;
    this.searchProduct.name = null;
    this.searchProducts();
  }
  selectCategory(checked,category){    
    this.wait = true;
    if(checked){
      this.searchProduct.categories.push(category);
    }else{
      this.searchProduct.categories.splice(this.searchProduct.categories.indexOf(category),1);
    }
    this.searchProducts();
  }

  selectType(checked,type){
    this.wait = true;
    if(checked){
      this.searchProduct.types.push(type);
    }else{
      this.searchProduct.types.splice(this.searchProduct.types.indexOf(type),1);
    }
    this.searchProducts();
  }

  selectSuperType(checked,superType){
    this.wait = true;
    if(checked){
      this.searchProduct.superTypes.push(superType);
    }else{
      this.searchProduct.superTypes.splice(this.searchProduct.superTypes.indexOf(superType),1);
    }
    this.typeService.getAllTypeBySuperTypes(this.searchProduct.superTypes).subscribe((result:any)=>{
      this.typesOfSuperTypes=result.data;   
    },err => console.error(err));
    this.searchProducts();
  }

  selectKind(checked,kind){
    this.wait = true;
    if(checked){
      this.searchProduct.kinds.push(kind);
    }else{
      this.searchProduct.kinds.splice(this.searchProduct.kinds.indexOf(kind),1);
    }
    this.searchProducts();
  }

  selectBox(checked,box){
    this.wait = true;
    if(checked){
      this.searchProduct.boxes.push(box);
    }else{
      this.searchProduct.boxes.splice(this.searchProduct.boxes.indexOf(box),1);
    }
    this.searchProducts();
  }

  selectColor(color: Color){
    this.wait = true;
    if(this.searchProduct.colours.indexOf(color)!=-1){
      this.searchProduct.colours.splice(this.searchProduct.colours.indexOf(color),1);
      this.colorSelected.set(color.id,false);
    }else{
      this.searchProduct.colours.push(color);
      this.colorSelected.set(color.id,true);
    }
    this.searchProducts();
  }

  changeAvailable(checked){
    this.wait = true;
    this.searchProduct.available=checked;
    this.searchProducts();
  }

  searchProducts(){
    this.productService.searchProduct(this.searchProduct).subscribe((result:any)=>{
      this.products=result.data;   
      console.log(this.products);
      this.wait = false;
    },err => console.error(err));
  }


  openDialog(object): void {
    const dialogConfig = new MatDialogConfig();
    if(object!=null){
      let copy = Object.assign({}, object);
      dialogConfig.data=copy;
    }
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose=true;
    let dialogRef = this.dialog.open(DisplayProductDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      this.wait = true;
      this.searchProducts();
    });
  }

  addBook(product:Product){
    this.wait = true;
    this.utils.addBook(product).subscribe((result:any)=>{
      this.searchProducts();    
    },err => console.error(err));;
  }

  isAvailable(totalQuantity,totalBooked,requestQuantity): boolean {
   return this.utils.isAvailable(totalQuantity,totalBooked,requestQuantity);
  }

  isStock(totalQuantity,totalBooked):boolean{
    return this.utils.isStock(totalQuantity,totalBooked);
  }


  
}
