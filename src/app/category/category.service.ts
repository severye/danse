import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService{
    constructor(private daoService : DaoService){

    }

    getAllCategories(): Observable<ObjectDanse>{
        return this.daoService.getAPI('categories');
    }

    addCategory(category: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.postAPI('categories',category);
    }

    deleteCategory(id:string): Observable<ObjectDanse>{
        return this.daoService.deleteAPI('categories/'+id);
    }

    updateCategory(category: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.putAPI('categories',category);
    }
}