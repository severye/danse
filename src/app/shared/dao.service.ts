import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DaoService{

    private httpOptionsAuth = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','authorization' : 'Bearer ' +  localStorage.getItem('access_token') })
    };

    getURL(): string {
        return environment.back_url;
    }
    getHeaders(){
        return this.httpOptionsAuth;
    }
    constructor(private httpClient: HttpClient){
    }
    public getAPI<T>(path: string): Observable<T> {
        return this.httpClient.get<T>(this.getURL() + path, this.getHeaders());
    }
    
}