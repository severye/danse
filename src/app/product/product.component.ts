import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddProductDialogComponent } from './add-product/add-product-dialog.component';
import { ProductService } from './product.service';
import { Product } from './product.object';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  objects : Array<Product>;

  constructor(private productService : ProductService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    console.log('in');
    this.productService.getAllProducts().subscribe((result:any) =>{

      console.log('after');
      this.objects = result.data;  
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
      if(result!=null){
        this.productService.addProduct(result).subscribe(data =>{
          this.getAllProducts();
        },err => console.error(err)); 
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
    });
  }
}
