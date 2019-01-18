import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddProductDialogComponent } from './add-product/add-product-dialog.component';
import { ProductService } from './product.service';
import { Product } from './product.object';
import { ObjectDanse } from '../shared/objectDanse';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  objects : Array<Product>;
  wait: boolean;
  id: string;
  product : Product;

  constructor(private productService : ProductService,public dialog: MatDialog,public route : ActivatedRoute) { }

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
    this.wait=true;
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((result:any) =>{
      this.objects = result.data;       
      this.wait=false;
    },err => console.error(err));
  }
  
  delete(id){    
    this.productService.deleteProduct(id).subscribe(result =>{
      this.getAllProducts();
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
    let dialogRef = this.dialog.open(AddProductDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result!=null && result!=''){
        this.wait=true;
        this.productService.addProduct(result).subscribe(data =>{
          this.getAllProducts();
        },err => console.error(err)); 
      }
    else{
      this.getAllProducts();
    }
    });
  }

  addProductDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose=true;
    let dialogRef = this.dialog.open(AddProductDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.productService.addProduct(result).subscribe(data =>{
           this.getAllProducts();
        },err => console.error(err));  
      }
      else{
        this.getAllProducts();
      }
    });
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

  
}
