import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box.component';
import { BoxService } from './box.service';
import { DaoService } from '../shared/dao.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BoxComponent],
  providers: [BoxService, DaoService]
})
export class BoxModule {
 }
