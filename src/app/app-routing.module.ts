import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail.component';

	
const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  {path:'sign-up',loadChildren: () => import('./public/public.module').then(m=> m.PublicModule)},
  {path: 'product/:id', canActivate: [],component: ProductDetailComponent},
  {path:'welcome', component:WelcomeComponent},
   { path: '', redirectTo: 'Welcome', pathMatch: 'full' }
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
