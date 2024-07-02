import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductionComponent } from './production/production.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { MilkPurchaseComponent } from './milk-purchase/milk-purchase.component';

const routes:
Routes = [
  {path:'homepage',component:HomePageComponent},
  {path:'clientDetails',component:ClientDetailsComponent},
  {path:'milkPurchase',component:MilkPurchaseComponent},
  {path:'production',component:ProductionComponent},
  {path:'products',component:ProductDetailsComponent},
  {path:'Production',component:ProductionComponent},
  {path:'Products',component:ProductDetailsComponent},
  {path:'feedDetails',component:FeedDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
