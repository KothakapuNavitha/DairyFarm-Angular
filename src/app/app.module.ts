import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductionComponent } from './production/production.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MaterialdesignModule } from './materialdesign/materialdesign.module';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { MilkPurchaseComponent } from './milk-purchase/milk-purchase.component';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { PurchaceDetailsComponent } from './purchace-details/purchace-details.component';
import { PurchaseReportsComponent } from './purchase-reports/purchase-reports.component';
import { LoginComponent } from './login/login.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';





@NgModule({
  declarations: [
    AppComponent,
    ClientDetailsComponent,
    HomePageComponent,
    ProductionComponent,
    ProductionDetailsComponent,
    ProductDetailsComponent,
    MilkPurchaseComponent,
    CattleDetailsComponent,
    FeedDetailsComponent,
    MilkPurchaseComponent,
    PurchaceDetailsComponent,
    PurchaseReportsComponent,
    LoginComponent,
    SidemenuComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgFor,
    AgGridModule,
    MaterialdesignModule, // Make sure this is imported
    MaterialdesignModule,
    AgGridModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
