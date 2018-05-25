
import { Book } from "./book.object";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { DaoService } from "../shared/dao.service";

@Injectable()
export class BookService{
    constructor(private daoService : DaoService){

    }

    saveBook(book: Book): Observable<Book>{
        return this.daoService.postAPI('books',book);
    }

    getBooks():Observable<any>{
        return this.daoService.getAPI('books/user');
    }

    deleteBook(id: string):Observable<any>{
        return this.daoService.deleteAPI('books/'+id);
    }
}