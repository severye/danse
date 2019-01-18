import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DaoService{


    getURL(): string {
        return environment.back_url;
    }
    getHeaders(){
        let httpOptionsAuth = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json','authorization' : 'Bearer ' +  localStorage.getItem('access_token') })
        };;
        return httpOptionsAuth;
    }
    constructor(private httpClient: HttpClient){
    }
    public getAPI<T>(path: string): Observable<T> {
        return this.httpClient.get<T>(this.getURL() + path, this.getHeaders());
    }
    public postAPI<T>(path: string,body: Object ): Observable<T> {
        return this.httpClient.post<T>(this.getURL() + path,JSON.stringify(body), this.getHeaders(),);
    }
    public deleteAPI<T>(path: string): Observable<T> {
        return this.httpClient.delete<T>(this.getURL() + path, this.getHeaders());
    }
    public putAPI<T>(path: string,body: Object): Observable<T> {
        return this.httpClient.put<T>(this.getURL() + path,JSON.stringify(body), this.getHeaders());
    }
}