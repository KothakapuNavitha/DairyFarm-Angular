import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesCls } from './Classes/SalesClass';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private url = "https://localhost:7219/api/";
  baseUrl!: string;
  constructor(private http: HttpClient) { }

  getCustomer(): Observable<customer[]>{
    return this.http.get<customer[]>(this.url+"CustomerDetails/GetCustomerListData");
 }

 insertSalesDetails(salecls :SalesCls){
  return this.http.post(this.url +"Sales/InsertSalesDetails",salecls)
 }

 getAllSales(){
  return this.http.get(this.url +"salesDetails/GetAllSalesData")
 }
}
export interface customer {
  customerId: number;
  customerName: string;
}

