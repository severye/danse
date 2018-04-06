import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'NK7PvbJ0WXehSVlFQtA1oeBpMVL0x8XT',
    domain: 'danse-attitude.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://danse-attitude.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}