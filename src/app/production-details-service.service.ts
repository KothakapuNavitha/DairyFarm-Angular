import { Injectable } from '@angular/core';
import { productiondetailscls } from './Classes/ProductionDetailsClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductionDetailsServiceService {
  url= " https://localhost:7023/api/";

  constructor(private http:HttpClient) { }
  insertproductionData(producls:productiondetailscls){
    return this.http.post(this.url+"ProductionDetailsType/ProductionDetails",producls)

  }
  updateproductiondetails(producls:productiondetailscls){
   return this.http.post(this.url+"ProductionDetailsType/ProductionDetails",producls) 
  }
  deleteProductionData(producls:productiondetailscls){
  return this.http.post(this.url+"ProductionDetails/GetProductionDetailsType",producls)
  }
  GetProductionDetails(producls:productiondetailscls){
    return this.http.post(this.url+"ProductionDetails/GetProductionDetailsType",producls)

  }

}
