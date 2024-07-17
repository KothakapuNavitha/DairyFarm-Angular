import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetailsCls } from './Classes/ProductDetailsCls';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  url="https://localhost:7210/api/"


  constructor(private http:HttpClient){

   }
   insertProductDetails(productDetailsCls:ProductDetailsCls){
    return this.http.post(this.url+"Products/ProductDetails",productDetailsCls)
   }
   getProductDetails(productDetailsCls:ProductDetailsCls){
    return this.http.post(this.url+"ProductDetails/GetProductDetails",productDetailsCls)
   }
}
