import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.object';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.object';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Array<Book>;
  wait : boolean;
  constructor(public bookService: BookService, public productService: ProductService) { }

  ngOnInit() {
    this.wait = true;
    this.getAllBookByUser();
  }

  getAllBookByUser(){
    this.bookService.getBooks().subscribe((result:any)=>{
      this.books=result.data
      if(this.books.length>0){
        this.books.forEach(element => {
          this.productService.getProductById(element.idProduct).subscribe((result:any)=>{
            element.product=result.data;
            this.wait = false;
          },err => console.error(err));
        });
      }else{        
        this.wait = false;
      }
    },err => console.error(err));
  }

  deleteBook(book){
    this.wait = true;
    this.bookService.deleteBook(book.id).subscribe((result:any)=>{
        this.getAllBookByUser();
    },err => console.error(err));
  }

}
