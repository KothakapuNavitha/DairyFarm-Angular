import { Component ,OnDestroy, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { productiondetailscls } from '../Classes/ProductionDetailsClass';
import { HttpClient } from '@angular/common/http';
import { ProductionDetailsServiceService} from '../production-details-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-production-details',
  templateUrl: './production-details.component.html',
  styleUrls: ['./production-details.component.css'],
})

export class ProductionDetailsComponent implements OnInit,OnDestroy{
  rowData=[];

  colDefs:any[]=[
    {headerName:'TranNo',field:'tranNo'},
    {headerName:'TagNo',field:'tagNo'},
    {headerName:'Quantity',field:'quantity'},
    {headerName:'SNF',field:'snf'},
  ]
  hide: boolean = true;
  public ProductionDetailsform!:FormGroup;
  public prodcls!:productiondetailscls;
   TagNo!:string;
  public msg:string="";
  public textcolor:string="";
  constructor(private prodSrv:ProductionDetailsServiceService,private fb:FormBuilder,private http:HttpClient,private snackBar: MatSnackBar,public toastr:ToastrService){
    this.formInit();
    this.prodcls = new productiondetailscls;
  }
  ngOnDestroy(): void {
  
  }
  ngOnInit(): void {
    this.GetAllProductionDetails();

     }
  formInit(){
    this.ProductionDetailsform=this.fb.group({
      tranNo:['',Validators.required],
      tagNo:['',Validators.nullValidator],
      quantity:['',Validators.required],
      SNF:['',Validators.required]
    });
  }
  submit(){
   //debugger;
    // console.log(this.ProductionDetailsform.value);
    if(this.ProductionDetailsform.invalid){
      this.snackBar.open('Please enter required fields','okay');
      this.toastr.error("please enter required details","ERROR");

      return;
    }
    else{

      try{
        const formValues=this.ProductionDetailsform.value;
        this.prodcls.mode='Insert';
        this.prodcls.tranNo=formValues.tranNo;
        this.prodcls.tagNo=this.TagNo;
        this.prodcls.quantity=formValues.quantity;
        this.prodcls.SNF=formValues.SNF;
        this.snackBar.open('Details inserted','okay');
        this.toastr.success("Details inserted","SUCCESS");
        console.log(this.prodcls)
        this.prodSrv.insertproductionData(this.prodcls).subscribe((res:any)=>{
          console.log(res);
          if(res.status==="Success"){
            this.msg=res.dbMsg;
            this.textcolor="green";
            this.GetAllProductionDetails();
          }
          else{
            this.msg=res.dbMsg;
            this.textcolor="red";

          }
        });
      }
      catch(ex:any){
            this.msg=ex.dbMsg;
            this.textcolor="green";

      }
      finally{

      }
    }
  }
  update(){
    console.log(this.ProductionDetailsform.value);
    if(this.ProductionDetailsform.invalid){
      this.snackBar.open('Please enter required fields','okay');
      this.toastr.error("please enter required details","ERROR");

      return;
    }
    else{
      try{
        const formValues=this.ProductionDetailsform.value;
        this.prodcls.mode='Update';
        this.prodcls.tagNo=this.TagNo ;
        this.prodcls.tranNo=formValues.tranNo;
       this.prodcls.quantity=formValues.quantity;
       this.prodcls.SNF=formValues.snf;
       this.snackBar.open('Details inserted','okay');
       this.toastr.success("Details inserted","SUCCESS");
       console.log(this.prodcls);
       this.prodSrv.updateproductiondetails(this.prodcls).subscribe((res:any)=>{
      console.log(res);
      if(res.status==="Success"){
        this.msg=res.dbMsg;
        this.textcolor="green";
        this.GetAllProductionDetails();
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
 delete(){
  this.prodcls.mode="Delete";
  this.prodcls.tagNo=this.TagNo;
  this.prodSrv.deleteProductionData(this.prodcls).subscribe((res:any)=>{
    console.log(res);
    if(res.status==="Success"){
      this.msg=res.dbMsg;
      this.textcolor="green";
    }
    else{
      this.msg=res.dbMsg;
      this.textcolor="red";
    }
  });
 }
 get(){
  this.prodcls.tagNo=this.TagNo;
    this.prodcls.mode = 'Get';
    console.log(this.prodcls);
    this.prodSrv.GetProductionDetails(this.prodcls).subscribe((res:any)=>{
      console.log(res);
      if(res.status==="Success")
        {
          this.ProductionDetailsform.patchValue({
            'tranNo':res.tranNo,
            'quantity':res.quantity,
            'SNF':res.snf
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

clear(){
  this.TagNo="";
  this.formInit();
  this.msg="";
  this.textcolor="red";
}
GetAllProductionDetails() {
  this.prodSrv.getAllProductionData().subscribe((res: any) => {
    console.log(res);
    this.rowData = res;
  });
}
 }



 
   






