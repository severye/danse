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
  constructor(public bookService: BookService, public productService: ProductService) { }

  ngOnInit() {
    this.getAllBookByUser();
  }

  getAllBookByUser(){
    this.bookService.getBooks().subscribe((result:any)=>{
      this.books=result.data
      this.books.forEach(element => {
        this.productService.getProductById(element.idProduct).subscribe((result:any)=>{
          element.product=result.data;
        },err => console.error(err));
      });
      console.log(this.books);
    },err => console.error(err));
  }

  deleteBook(book){
    this.bookService.deleteBook(book.id).subscribe((result:any)=>{
        this.getAllBookByUser();
    },err => console.error(err));
  }

}
