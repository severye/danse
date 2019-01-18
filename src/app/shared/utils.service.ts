import { Injectable } from "@angular/core";
import { Product } from "../product/product.object";
import { Book } from "../book/book.object";
import { BookService } from "../book/book.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class Utils{

  constructor(public bookService: BookService){

  }
  isAvailable(totalQuantity,totalBooked,requestQuantity): boolean {
      if(requestQuantity==null){
        requestQuantity=0;
      }
      if(totalBooked<0){
        return false;
      }
      if(totalQuantity==null ||  (totalQuantity-totalBooked>0 && totalQuantity-requestQuantity-totalBooked>=0)){
        return true;
      }
      return false;
    }
  
    isStock(totalQuantity,totalBooked):boolean{
      if(totalQuantity==null || totalQuantity-totalBooked>0){
        return true;
      }else{
        return false;
      }
    }

  addBook(product:Product): Observable<any>{
    let book = new Book();
    if(product.quantityAvailable>0){
      book.quantity=product.quantityAvailable;
    }else{
      book.quantity=product.totalQuantity-product.quantityBooked;
    }
    
    book.idProduct=product.id;
    return this.bookService.saveBook(book);
  }
}