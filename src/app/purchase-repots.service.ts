import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { purchaseReportsCls } from './Classes/PurchaseReportsClass';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRepotsService {
//  url = "https://localhost:7219/api/"

//   constructor(private http:HttpClient) { }

//   getClients(): Observable<Client[]>{
//     return this.http.get<Client[]>(this.url+"ClientDetails/GetClientListData");
//   }

private url = "https://localhost:7219/api/";
baseUrl!: string;
  constructor(private http: HttpClient) { }

  // getAllPurchaseData(): Observable<any[]> {
  //   return this.http.get<any[]>(${this.url}purchaseData/getAllPurchaseData);
  // }
  getAllPurchaseData(){
    return this.http.get(this.url +"purchaseData/getAllPurchaseData")
   }

  getClients(): Observable<Client[]>{
         return this.http.get<Client[]>(this.url+"ClientDetails/GetClientListData");
      }

  // GetPurchaseReports(purchcls:purchaseReportsCls){
  //   return this.http.post(this.url + "PurchaseReportsData/GetPurchaseReportsDetails",purchcls)
  // }

  GetPurchaseReports(purchase: any): Observable<any[]> {
    return this.http.post<any[]>(this.url + "PurchaseReportsData/GetPurchaseReportsDetails", purchase);
  }
}

export interface Client {
  clientId: number;
  name: string;
}
