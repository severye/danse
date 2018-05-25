import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";

@Injectable()
export class TypeService{
    constructor(private daoService : DaoService){

    }

    getAllTypes(): Observable<ObjectDanse>{
        return this.daoService.getAPI('types');
    }

    addType(type: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.postAPI('types',type);
    }

    deleteType(id:string): Observable<ObjectDanse>{
        return this.daoService.deleteAPI('types/'+id);
    }

    updateType(type: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.putAPI('types',type);
    }
}