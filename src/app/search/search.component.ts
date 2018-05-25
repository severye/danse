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


  constructor(public kindService : KindService,
    public bookService : BookService,
    public categoryService : CategoryService,
    public typeService : TypeService,
    public boxService : BoxService,
    public sizeService : SizeService,
    public colorService: ColorService,public productService: ProductService,public dialog: MatDialog) { }

  ngOnInit() {
    this.colorService.getAllColors().subscribe((result:any) => { 
      this.colours=result.data;
    },err => console.error(err));

    this.kindService.getAllKinds().subscribe((result:any) => { 
      this.kinds=result.data;
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

    this.productService.getAllProductsWithQuantitiesBooked().subscribe((result:any) => { 
      this.products=result.data;
      console.log(this.products);
    },err => console.error(err));
    this.searchProduct = new SearchProduct();
    this.searchProduct.categories = new Array<ObjectDanse>();
    this.searchProduct.types = new Array<ObjectDanse>();
    this.searchProduct.kinds = new Array<ObjectDanse>();
    this.searchProduct.boxes = new Array<ObjectDanse>();
    this.searchProduct.colours = new Array<Color>();

    this.colorSelected = new Map<string,boolean>();
  }
  selectCategory(checked,category){
    
    if(checked){
      this.searchProduct.categories.push(category);
    }else{
      this.searchProduct.categories.splice(this.searchProduct.categories.indexOf(category),1);
    }
    this.searchProducts();
  }

  selectType(checked,type){
    if(checked){
      this.searchProduct.types.push(type);
    }else{
      this.searchProduct.types.splice(this.searchProduct.types.indexOf(type),1);
    }
    this.searchProducts();
  }

  selectKind(checked,kind){
    if(checked){
      this.searchProduct.kinds.push(kind);
    }else{
      this.searchProduct.kinds.splice(this.searchProduct.kinds.indexOf(kind),1);
    }
    this.searchProducts();
  }

  selectBox(checked,box){
    if(checked){
      this.searchProduct.boxes.push(box);
    }else{
      this.searchProduct.boxes.splice(this.searchProduct.boxes.indexOf(box),1);
    }
    this.searchProducts();
  }

  selectColor(color: Color){
    if(this.searchProduct.colours.indexOf(color)!=-1){
      this.searchProduct.colours.splice(this.searchProduct.colours.indexOf(color),1);
      this.colorSelected.set(color.id,false);
    }else{
      this.searchProduct.colours.push(color);
      this.colorSelected.set(color.id,true);
    }
    this.searchProducts();
  }

  searchProducts(){
    this.productService.searchProduct(this.searchProduct).subscribe((result:any)=>{
      this.products=result.data;   
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
      
    });
  }

  addBook(product:Product){
    let book = new Book();
    book.name = localStorage.getItem("name");
    if(product.quantityAvailable>0){
      book.quantity=product.quantityAvailable;
    }else{
      book.quantity=product.totalQuantity-product.quantityBooked;
    }
    
    book.idProduct=product.id;
    this.bookService.saveBook(book).subscribe((result:any)=>{
      this.searchProducts();    
    },err => console.error(err));;
  }
}
