import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductionComponent } from './production/production.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MilkPurchaseComponent } from './milk-purchase/milk-purchase.component';

const routes:
Routes = [
  {path:'Home',component:HomePageComponent},
  {path:'clientDetails',component:ClientDetailsComponent},
  {path:'milkPurchase',component:MilkPurchaseComponent},
  {path:'Production',component:ProductionComponent},
  {path:'Products',component:ProductDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
