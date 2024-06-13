import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';

const routes: 
Routes = [
  {path: '',  component:HomePageComponent},
  {path:'homepage',component:HomePageComponent},
  {path:'clientDetails',component:ClientDetailsComponent},
  {path:'CattleDetails',component:CattleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
