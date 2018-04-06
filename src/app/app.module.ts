import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoxModule } from './box/box.module';

import {AppRoutingModule } from './app-routing.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { KindModule } from './kind/kind.module';
import { TypeModule } from './type/type.module';
import { SizeModule } from './size/size.module';
import { ColorModule } from './color/color.module';
import { AuthService } from './shared/auth.service';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,BoxModule,AppRoutingModule,CategoryModule,ProductModule,KindModule,TypeModule,SizeModule,
    ColorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private Auth : AuthService){}
}
