import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDetailsCls } from './Classes/CustomerDetailsClass';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = "https://localhost:7219/api/"
  constructor(private http:HttpClient) {

  }
  insertCustomerDetails(custcls:CustomerDetailsCls){
    return this.http.post(this.url +"CustomerDetails/InsertCustomerDetails",custcls)
  }
  GetCustomerDetails(custcls:CustomerDetailsCls){
    return this.http.post(this.url +"GetCustomerDetails/CustomerData",custcls)
  }

  GetAllCustomerData(){
    return this.http.get(this.url + "CustomerData/GetAllCustomerDatails")
  }

}
