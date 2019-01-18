import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";
import { Type } from "./type.object";

@Injectable()
export class TypeService{
    constructor(private daoService : DaoService){

    }

    getAllTypes(): Observable<Type>{
        return this.daoService.getAPI('types');
    }

    addType(type: Type): Observable<Type>{
        return this.daoService.postAPI('types',type);
    }

    deleteType(id:string): Observable<Type>{
        return this.daoService.deleteAPI('types/'+id);
    }

    updateType(type: Type): Observable<Type>{
        return this.daoService.putAPI('types',type);
    }

    getAllTypeBySuperTypes(superTypes : Array<ObjectDanse>): Observable<Type>{
        return this.daoService.postAPI('types/supertypes',superTypes);
    }

    getAllTypeBySuperType(id : string): Observable<Type>{
        return this.daoService.getAPI('types/supertypes/'+id);
    }
}