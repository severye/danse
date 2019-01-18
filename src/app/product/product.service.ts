import { DaoService } from "../shared/dao.service";
import { Observable } from "rxjs/Observable";
import { ObjectDanse } from "../shared/objectDanse";
import { Injectable } from "@angular/core";
import { Product } from "./product.object";
import { SearchProduct } from "../search/search-product.object";

@Injectable()
export class ProductService{
    constructor(private daoService : DaoService){

    }

    getProductById(id:string): Observable<Product>{
        return this.daoService.getAPI('products/'+id);
    }

    getAllProducts(): Observable<any>{
        return this.daoService.getAPI('products');
    }

    getProductsByBox(id: string) : Observable<any>{
        return this.daoService.getAPI('products/boxes/'+id);
    }

    getAllProductsWithQuantitiesBooked(): Observable<any>{
        return this.daoService.getAPI('/products/quantitybooked');
    }

    addProduct(product: Product): Observable<Product>{
        return this.daoService.postAPI('products',product);
    }

    deleteProduct(id:string): Observable<Product>{
        return this.daoService.deleteAPI('products/'+id);
    }

    updateProduct(product: Product): Observable<Product>{
        return this.daoService.putAPI('products',product);
    }

    searchProduct(searchProduct: SearchProduct): Observable<any>{
        return this.daoService.postAPI('products/search',searchProduct);
    }
}