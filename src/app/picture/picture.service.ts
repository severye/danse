import { Injectable } from "@angular/core";
import { DaoService } from "../shared/dao.service";
import { Picture } from "./picture.object";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PictureService{
    constructor(private daoService : DaoService){

    }
    deletePicture(id:string): Observable<Picture>{
        return this.daoService.deleteAPI('pictures/'+id);
    }
}