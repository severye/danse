import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";

@Injectable()
export class SizeService{
    constructor(private daoService : DaoService){

    }

    getAllSizes(): Observable<ObjectDanse>{
        return this.daoService.getAPI('sizes');
    }

    addSize(size: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.postAPI('sizes',size);
    }

    deleteSize(id:string): Observable<ObjectDanse>{
        return this.daoService.deleteAPI('sizes/'+id);
    }

    updateSize(size: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.putAPI('sizes',size);
    }
}