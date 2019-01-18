import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from "angular2-image-upload";
import { AppComponent } from './app.component';

import {AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { DaoService } from './shared/dao.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/Material.module';
import { BoxComponent } from './box/box.component';
import { BoxService } from './box/box.service';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category/category.service';
import { KindComponent } from './kind/kind.component';
import { KindService } from './kind/kind.service';
import { SizeComponent } from './size/size.component';
import { SizeService } from './size/size.service';
import { TypeComponent } from './type/type.component';
import { TypeService } from './type/type.service';
import { ColorService } from './color/color.service';
import { ColorComponent } from './color/color.component';
import { ObjectDialogComponent } from './object-dialog/object-dialog.component';
import { ColorDialogComponent } from './color/color-dialog/color-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product/product.service';
import { AddProductDialogComponent } from './product/add-product/add-product-dialog.component';
import { SearchComponent } from './search/search.component';
import { DisplayProductDialogComponent } from './product/display-product/display-product-dialog.component';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';

import { BookComponent } from './book/book.component';
import { BookService } from './book/book.service';
import { Utils } from './shared/utils.service';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { PictureService } from './picture/picture.service';
import { SupertypeComponent } from './supertype/supertype.component';
import { SuperTypeService } from './supertype/supertype.service';
import { TypeDialogComponent } from './type/type-dialog/type-dialog.component';
import { BoxManagementComponent } from './box/box-management/box-management.component';
@NgModule({
  declarations: [
    AppComponent, CallbackComponent,BoxComponent,ObjectDialogComponent,DisplayProductDialogComponent,CategoryComponent,KindComponent,SizeComponent,
    TypeComponent,ColorComponent,ColorDialogComponent,ProductComponent,AddProductDialogComponent, SearchComponent, BookComponent, CloseDialogComponent,
    TypeDialogComponent,BoxManagementComponent,
    SupertypeComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule,FormsModule,ImageUploadModule.forRoot(),
    BrowserModule,BrowserAnimationsModule,MaterialModule,CommonModule,FormsModule,ColorPickerModule,
    BootstrapSwitchModule.forRoot(),BrowserAnimationsModule
    

  ],
  providers: [AuthService,AuthGuard,Utils,DaoService,SuperTypeService,PictureService,BookService,BoxService,CategoryService,KindService,SizeService,TypeService,ColorService,ProductService],
  bootstrap: [AppComponent],
  entryComponents: [CloseDialogComponent,ObjectDialogComponent,ColorDialogComponent,AddProductDialogComponent,DisplayProductDialogComponent,TypeDialogComponent]
})
export class AppModule { 
}
