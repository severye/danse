import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxComponent } from './box/box.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { KindComponent } from './kind/kind.component';
import { TypeComponent } from './type/type.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './callback/callback.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {path: 'box', component : BoxComponent, canActivate: [AuthGuard]},
      {path: 'category', component : CategoryComponent, canActivate: [AuthGuard]},
      {path: 'product', component : ProductComponent, canActivate: [AuthGuard]},
      {path: 'kind', component : KindComponent, canActivate: [AuthGuard]},
      {path: 'type', component : TypeComponent, canActivate: [AuthGuard]},
      {path: 'color', component : ColorComponent, canActivate: [AuthGuard]},
      {path: 'size', component : SizeComponent, canActivate: [AuthGuard]},
      {path: 'search', component : SearchComponent, canActivate: [AuthGuard]},
      {path: 'book', component : BookComponent, canActivate: [AuthGuard]},
      {path: 'callback', component: CallbackComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

