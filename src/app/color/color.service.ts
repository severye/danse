import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Color } from "./color.object";

@Injectable()
export class ColorService{
    constructor(private daoService : DaoService){

    }

    getAllColors(): Observable<Color>{
        return this.daoService.getAPI('colours');
    }

    addColor(color: Color): Observable<Color>{
        return this.daoService.postAPI('colours',color);
    }

    deleteColor(id:string): Observable<Color>{
        return this.daoService.deleteAPI('colours/'+id);
    }

    updateColor(color: Color): Observable<Color>{
        return this.daoService.putAPI('colours',color);
    }
}