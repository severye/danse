import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";

@Injectable()
export class KindService{
    constructor(private daoService : DaoService){

    }

    getAllKinds(): Observable<ObjectDanse>{
        return this.daoService.getAPI('kinds');
    }

    addKind(kind: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.postAPI('kinds',kind);
    }

    deleteKind(id:string): Observable<ObjectDanse>{
        return this.daoService.deleteAPI('kinds/'+id);
    }

    updateKind(kind: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.putAPI('kinds',kind);
    }
}