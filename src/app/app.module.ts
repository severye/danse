import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoxModule } from './box/box.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,BoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
