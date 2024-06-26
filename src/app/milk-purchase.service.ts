import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { milkPurchaseCls } from './Classes/MilkPurchaceClass';

@Injectable({
  providedIn: 'root'
})
export class MilkPurchaseService {
  url ="https://localhost:7219/api/"
  constructor(private http:HttpClient) {

  }
  insertMilkPurchaseDetails(milkcls:milkPurchaseCls){
   return this.http.post(this.url +"",milkcls)
  }
  GetMilkPurchaseDetails(milkcls:milkPurchaseCls){
    return this.http.post(this.url +"",milkcls)
  }

}
