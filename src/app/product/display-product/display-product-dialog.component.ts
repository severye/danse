import { OnInit, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Product } from "../product.object";
import { AddProductDialogComponent } from "../add-product/add-product-dialog.component";
import { SizeService } from "../../size/size.service";
import { ObjectDanse } from "../../shared/objectDanse";
import { Utils } from "../../shared/utils.service";
import { Book } from "../../book/book.object";

@Component({
    selector: 'display-product-dialog',
    templateUrl: 'display-product-dialog.component.html',
    styleUrls: ['display-product-dialog.component.css']
  })
export class DisplayProductDialogComponent implements OnInit {

    booksNotFinish : Array<Book> = [];
    sizes : Array<ObjectDanse> = [];

    constructor(public utils: Utils,public dialogRef: MatDialogRef<AddProductDialogComponent>,@Inject(MAT_DIALOG_DATA) public product: Product, public sizeService : SizeService){
        
    }
    ngOnInit(){
        this.product.productBook.forEach((element:any) => {
          if(element.endDate==null){
            this.booksNotFinish.push(element);
          }
          
        });
        this.sizeService.getAllSizes().subscribe((result:any) => { 
            this.sizes=result.data;
            console.log(this.sizes);
          },err => console.error(err));
    }
    close() {
        this.dialogRef.close();
      }

      isAvailable(totalQuantity,totalBooked,requestQuantity): boolean {
        return this.utils.isAvailable(totalQuantity,totalBooked,requestQuantity);
      }
    
      isStock(totalQuantity,totalBooked):boolean{
        return this.utils.isStock(totalQuantity,totalBooked);
      }

      addBook(product:Product){
        this.utils.addBook(product).subscribe((result:any)=>{
          this.dialogRef.close();
        },err => console.error(err));;
      }
}