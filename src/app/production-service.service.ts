import { Injectable } from '@angular/core';
import{productioncls} from './Classes/ProductionClass'
import{HttpClient}from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductionServiceService {
  url= "https://localhost:7023/api/";

  constructor(private http:HttpClient) { }
  insertProductionDetails(prodCls: productioncls){
    return this.http.post(this.url +"ProductionType/ProductionTypeDetails",prodCls)
   }
   updateProductionDetails(prodCls:productioncls){
    return this.http.post(this.url+"ProductionType/ProductionTypeDetails",prodCls)
   }
   GetProductionDetails(prodCls:productioncls){
    return this.http.post(this.url+"ProductionType/GetProductionDetails",prodCls)
   }
   
   deleteProductionDetails(prodCls:productioncls){
    return this.http.post(this.url+"ProductionType/GetProductionDetails",prodCls)
   }


}
