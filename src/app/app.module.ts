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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ExcelExportService } from './excel-export.service';
import { AuthInterceptor } from './auth.interceptor';
// import { NgxUiLoaderModule,NgxUiLoaderConfig } from 'ngx-ui-loader';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SalesComponent } from './sales/sales.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
//import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { IndianCurrencyPipe } from './indian-currency.pipe';
import { LoaderinterceptorService } from './loaderinterceptor.service';








// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   fgsType: 'three-strings',
//   fgsColor: '#ff0000',
//   hasProgressBar: false,
// };


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
    HeaderComponent,
    LoaderComponent,
    UserRegistrationComponent,
    SalesComponent,
    CustomerDetailsComponent,
    IndianCurrencyPipe,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgFor,
    CommonModule,
    AgGridModule,
    MaterialdesignModule, // Make sure this is imported
    MaterialdesignModule,
    AgGridModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    ExcelExportService,
   // LoaderService,
   { provide: HTTP_INTERCEPTORS, useClass: LoaderinterceptorService, multi: true }  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
