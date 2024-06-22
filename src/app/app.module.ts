import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgFor } from '@angular/common';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductionComponent } from './production/production.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MaterialdesignModule } from './materialdesign/materialdesign.module';
import { ProductionDetailsComponent } from './production-details/production-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientDetailsComponent,
    SidebarComponent,
    HomePageComponent,
    CattleDetailsComponent,
    ProductionComponent,
    ProductionDetailsComponent,
    ProductDetailsComponent
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
    MaterialdesignModule, // Make sure this is imported
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
