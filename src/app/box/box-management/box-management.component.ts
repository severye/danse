import { Component, OnInit } from "@angular/core";
import { BoxService } from "../box.service";
import { ObjectDanse } from "../../shared/objectDanse";
import { Product } from "../../product/product.object";
import { ProductService } from "../../product/product.service";

@Component({
    selector: 'app-box-management',
    templateUrl: './box-management.component.html',
    styleUrls: ['./box-management.component.css']
  })
export class BoxManagementComponent implements OnInit {
    
    boxes : Array<ObjectDanse>;
    products : Array<Product>;
    idBox : string;
    wait : boolean;

    constructor(private boxService : BoxService, private productService : ProductService){}

    ngOnInit() {
        this.wait=true;
        this.getAllBoxes();
        this.selectBox();
    }

    getAllBoxes(){
        this.boxService.getAllBoxes().subscribe((result : any)=>{
            this.boxes = result.data;
            this.wait = false;
        },err => console.error(err));
    }

    selectBox(){
        this.products = null;
        if(this.idBox!=null){
            this.productService.getProductsByBox(this.idBox).subscribe((result : any)=>{
                this.products = result.data;
                this.products.forEach(element => {
                    if(element.box==null){
                        element.box = new ObjectDanse();
                    }
                });
                this.wait = false;
            },err => console.error(err));
        }
        
    }
    initBox

    changeBoxOfProduct(product : Product){
        this.wait = true
        this.productService.addProduct(product).subscribe((result : any)=>{
            this.wait=false;
        },err => console.error(err));
    }

    refresh(){
        this.wait = true;
        this.selectBox();
    }
}