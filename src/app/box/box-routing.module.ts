import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoxComponent } from './box.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'box', component: BoxComponent  }
  ])],
  exports: [RouterModule]
})
export class BoxRoutingModule { }
