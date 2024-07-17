import { PurchaceDetailsComponent } from './purchace-details/purchace-details.component';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductionComponent } from './production/production.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { MilkPurchaseComponent } from './milk-purchase/milk-purchase.component';
import { PurchaseReportsComponent } from './purchase-reports/purchase-reports.component';
import { LoginComponent } from './login/login.component';


const routes:
Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: 'clientDetails', component: ClientDetailsComponent },
  { path: 'cattleDetails', component: CattleDetailsComponent },
  { path: 'milkPurchase', component: MilkPurchaseComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'products', component: ProductDetailsComponent },
  { path: 'feedDetails', component: FeedDetailsComponent },
  { path: 'purchaseDetails', component: PurchaceDetailsComponent },
  { path: 'purchaseReports', component: PurchaseReportsComponent },
  { path: '**', redirectTo: 'homepage' },

  // { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'sign-up', component: SignupComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
