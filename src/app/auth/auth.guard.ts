import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private auth : AuthService, private router : Router){

    }

    canActivate(next :ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.auth.isAuthenticated){
            return true
        }else{
            this.router.navigate(['/']);
            return false;
        }
    }
}