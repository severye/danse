import { OnInit, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Product } from "../product.object";
import { AddProductDialogComponent } from "../add-product/add-product-dialog.component";
import { SizeService } from "../../size/size.service";
import { ObjectDanse } from "../../shared/objectDanse";

@Component({
    selector: 'display-product-dialog',
    templateUrl: 'display-product-dialog.component.html',
    styleUrls: ['display-product-dialog.component.css']
  })
export class DisplayProductDialogComponent implements OnInit {

    
    sizes : Array<ObjectDanse> = [];

    constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,@Inject(MAT_DIALOG_DATA) public product: Product, public sizeService : SizeService){
        
    }
    ngOnInit(){
        console.log(this.product);
        this.sizeService.getAllSizes().subscribe((result:any) => { 
            this.sizes=result.data;
            console.log(this.sizes);
          },err => console.error(err));
    }
    close() {
        this.dialogRef.close();
      }
}