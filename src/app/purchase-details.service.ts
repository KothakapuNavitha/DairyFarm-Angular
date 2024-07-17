import { purchaseDetailsCls } from './Classes/PurchaseDetailsClass';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailsService {
  url = "https://localhost:7219/api/"
  constructor(private http:HttpClient) {

   }
   insertPurchaseDetails(purchcls: purchaseDetailsCls){
      return this.http.post(this.url +"purchaseData/InsertPurchaseDetails",purchcls)
   }

   GetPurchaseDetails(purchcls:purchaseDetailsCls){
     return this.http.post(this.url +"purchaseData/Get_PurchaseDetails",purchcls)
   }

   getAllPurchaseData(){
    return this.http.get(this.url +"purchaseData/getAllPurchaseData")
   }
   getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url+"ClientDetails/GetClientListData");
  }

}
export interface Client {
  clientId: number;
  name: string;
}

