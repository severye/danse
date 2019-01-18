import { Injectable } from "@angular/core";
import { DaoService } from "../shared/dao.service";
import { ObjectDanse } from "../shared/objectDanse";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SuperTypeService{
    constructor(private daoService : DaoService){

    }

    getAllSuperTypes(): Observable<ObjectDanse>{
        return this.daoService.getAPI('supertypes');
    }

    addSuperType(superType: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.postAPI('supertypes',superType);
    }

    deleteSuperType(id:string): Observable<ObjectDanse>{
        return this.daoService.deleteAPI('supertypes/'+id);
    }

    updateSuperType(superType: ObjectDanse): Observable<ObjectDanse>{
        return this.daoService.putAPI('supertypes',superType);
    }
}