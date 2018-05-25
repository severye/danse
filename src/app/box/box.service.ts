import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";

@Injectable()
export class BoxService{
    constructor(private daoService : DaoService){

    }

    getAllBoxes(): Observable<ObjectDanse>{
        return this.daoService.getAPI('boxes');
    }

    addBox(box: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.postAPI('boxes',box);
    }

    deleteBox(id:string): Observable<ObjectDanse>{
        return this.daoService.deleteAPI('boxes/'+id);
    }

    updateBox(box: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.putAPI('boxes/',box);
    }
}