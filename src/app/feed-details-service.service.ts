import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{feedDetailscls}from './Classes/FeedDetailsClass'

@Injectable({
  providedIn: 'root'
})
export class FeedDetailsServiceService {
  url= "https://localhost:7023/api/";

  constructor(private http:HttpClient) {

  }

    insertFeedDetailsData(feedcls:feedDetailscls){
      return this.http.post(this.url+"FeedDetailsType/FeedDetailsData",feedcls)
  
    }
    updatefeedDetails(feedcls:feedDetailscls){
      return this.http.post(this.url+"FeedDetailsType/FeedDetailsData",feedcls)
    }
    GetFeedDetailsData(feedcls:feedDetailscls){
      return this.http.post(this.url+"FeedData/GetFeedDetails",feedcls)
    }
    deleteFeedDetails(feedcls:feedDetailscls){
      return this.http.post(this.url+"FeedData/GetFeedDetails",feedcls)
    }
    getAllFeedData(){
      return this.http.get(this.url+"FeedDetails/GetFeedDetailsType")
    }
}


