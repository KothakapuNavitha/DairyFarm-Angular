import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { ProductionComponent } from './production/production.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';

const routes: 
Routes = [
  {path:'homepage',component:HomePageComponent},
  {path:'clientDetails',component:ClientDetailsComponent},
  {path:'CattleDetails',component:CattleDetailsComponent},
  {path:'Production',component:ProductionComponent},
  {path:'Products',component:ProductDetailsComponent},
  {path:'feedDetails',component:FeedDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
