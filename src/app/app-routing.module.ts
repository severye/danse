import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoxComponent } from './box/box.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { KindComponent } from './kind/kind.component';
import { TypeComponent } from './type/type.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'box', component : BoxComponent, canActivate: [AuthGuard]},
      {path: 'category', component : CategoryComponent},
      {path: 'product', component : ProductComponent},
      {path: 'kind', component : KindComponent},
      {path: 'type', component : TypeComponent},
      {path: 'color', component : ColorComponent},
      {path: 'size', component : SizeComponent},
      {path: 'callback', component: CallbackComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

