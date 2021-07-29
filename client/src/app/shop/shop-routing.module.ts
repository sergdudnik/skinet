import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent}, // root component for shop.module
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}} // means "shop/:id"
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) // Not available for root!
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
