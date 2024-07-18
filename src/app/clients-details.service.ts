import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDetailsCls } from './Classes/ClientDetailsClass';


@Injectable({
  providedIn: 'root'
})
export class ClientsDetailsService {
  url = "https://localhost:7219/api/"
  constructor(private http:HttpClient) {

  }
  insertClientDetails(clntcls:ClientDetailsCls){
    return this.http.post(this.url +"ClientData/InsertClientData",clntcls)
  }
  GetClientDetails(clntcls:ClientDetailsCls){
    return this.http.post(this.url +"ClientDetails/GetClientData",clntcls)
  }
  getData(){
    return this.http.get(this.url + "ClientDetails/GetAllClientData")
  }

}
