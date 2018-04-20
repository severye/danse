import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DaoService } from './shared/dao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(public auth: AuthService, private daoService : DaoService) {
    // Comment out this method call if using
    // hash-based routing
    auth.handleAuthentication();
    // Uncomment this method call if using
    // hash-based routing
    // auth.handleAuthenticationWithHash();
  }

  ngOnInit(){   
  }
}
