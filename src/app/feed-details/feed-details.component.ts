import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import{feedDetailscls}from '../Classes/FeedDetailsClass';
import { HttpClient } from '@angular/common/http';
import{FeedDetailsServiceService}from '../feed-details-service.service'

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.css']
})
export class FeedDetailsComponent {
  public feedDetailsForm!:FormGroup;
  public feedDetails!:feedDetailscls;
  public msg:string="";
  public textcolor:string="";
  TranNo!:number;


constructor(private feedDetailsSrv:FeedDetailsServiceService,private fb:FormBuilder,private http:HttpClient){
  this.formInit();
  this.feedDetails = new feedDetailscls;

  }
  formInit(){
    this.feedDetailsForm=this.fb.group({
      TranNo:['',Validators.nullValidator],
      Date:['',Validators.required],
      TagNo:['',Validators.required],
      Gender:['',Validators.required],
      Description:['',Validators.required],
      Quantity:['',Validators.required],
      Rate:['',Validators.required]
    });
  }
  submit(){
    console.log(this.feedDetailsForm.value);
    if(this.feedDetailsForm.invalid){
      return;
  
  }
  else{
    try{
      const formValues = this.feedDetailsForm.value;
      this.feedDetails.Mode = 'Insert';
      this.feedDetails.TranNo = 0;
      this.feedDetails.Date=formValues.Date;
      this.feedDetails.TagNo=formValues.TagNo;
      this.feedDetails.Gender=formValues.Gender;
      this.feedDetails.Description=formValues.Description;
      this.feedDetails.Quantity=formValues.Quantity;
      this.feedDetails.Rate=formValues.Rate;
      console.log(this.feedDetails)
      this.feedDetailsSrv.insertFeedDetailsData(this.feedDetails).subscribe((res:any)=>{
      console.log(res);
      if(res.status==="Success"){
        this.msg= res.dbMsg;
        this.textcolor= "green";
      }
      else{
        this.msg=res.dbMsg;
        this.textcolor="red";
     }
     });
   }
   catch(ex:any){
     this.msg = ex.message;
     this.textcolor = "red";
   }
   finally{

   }
      
    }
  }
  update(){
    console.log(this.feedDetailsForm.value);
    if(this.feedDetailsForm.invalid){
      return;
  }
  else{
    try{
      const formValues=this.feedDetailsForm.value;
      this.feedDetails.Mode="Update";
      this.feedDetails.TranNo=this.TranNo;
      this.feedDetails.Date=formValues.Date;
      this.feedDetails.TagNo=formValues.TagNo;
      this.feedDetails.Gender=formValues.Gender;
      this.feedDetails.Description=formValues.Description;
      this.feedDetails.Quantity=formValues.Quantity;
      this.feedDetails.Rate=formValues.Rate;
      console.log(this.feedDetails)
      this.feedDetailsSrv.updatefeedDetails(this.feedDetails).subscribe((res:any)=>{
        console.log(res);
        if(res.status==="Success"){
          this.msg= res.dbMsg;
          this.textcolor= "green";
        }
        else{
          this.msg=res.dbMsg;
          this.textcolor="red";
       }
       });
     }
     catch(ex:any){
       this.msg = ex.message;
       this.textcolor = "red";
     }
    finally{

    }
     
    }
  }
  get()
  {
    this.feedDetails.TranNo=this.TranNo;
    this.feedDetails.Mode = 'Get';
    console.log(this.feedDetails);
    this.feedDetailsSrv.GetFeedDetailsData(this.feedDetails).subscribe((res:any)=>{
      console.log(res);
      if(res.status==="Success")
        {
          this.feedDetailsForm.patchValue({
            'Mode':res.mode,
            'Date':res.date,
            'TagNo':res.tagNo,
            'Gender':res.gender,
            'Description':res.description,
            'Quantity':res.quantity,
            'Rate':res.rate,
          });
          this.msg=res.dbMsg;
          this.textcolor="green";
  
        }
        else{
          this.msg=res.dbMsg;
          this.textcolor="red";
        }
      }); 
  }
  delete(){
    this.feedDetails.Mode="Delete";
    this.feedDetails.TranNo=this.TranNo;
    this.feedDetailsSrv.deleteFeedDetails(this.feedDetails).subscribe((res:any)=>{
      console.log(res);
      if(res.status=="Success")
        {
          this.msg=res.dbMsg;
          this.textcolor="green";
        }
        else{
          this.msg=res.dbMsg;
          this.textcolor="red";
        }

    })
  }

}





