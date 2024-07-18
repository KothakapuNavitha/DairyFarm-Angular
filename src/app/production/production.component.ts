import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { productioncls } from '../Classes/ProductionClass';
import { ProductionServiceService } from '../production-service.service';
import { HttpClient } from '@angular/common/http';
import { ProductionDetailsComponent } from '../production-details/production-details.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit,OnDestroy {
  public ProductionForm!:FormGroup;
  public Production!:productioncls;
  TranNo!:number;
  public msg:string="";
  public textcolor:string="";
  constructor(private productionSrv:ProductionServiceService,private fb:FormBuilder,private http:HttpClient,private dialogRef: MatDialog, private renderer: Renderer2,private snackBar: MatSnackBar,public toastr:ToastrService){
    this.formInit();
    this.Production = new productioncls;
    }
   
    openDialog(): void {
      this.dialogRef.open(ProductionDetailsComponent, {
        width: '800px'
      });
    }
   
    ngOnDestroy(): void {
      
    }
    ngOnInit(){

    }
  formInit() {
    const today = new Date();
    this.ProductionForm = this.fb.group({
    tranNo:['',Validators.nullValidator],
    date:[today,Validators.required],
     session :['',Validators.required],
     notes:['',Validators.nullValidator]
    }) ; 
  }
  submit(){
    //debugger
    console.log(this.ProductionForm.value);
    if(this.ProductionForm.invalid){
      this.snackBar.open('Please enter required fields','okay');
      this.toastr.error("please enter required details","ERROR");
     return;
    }
    else{
      
      try{
        const formValues = this.ProductionForm.value;
        this.Production.mode = 'Insert';
        this.Production.tranNo = 0;
        this.Production.date=formValues.date;
        this.Production.session=formValues.session;
        this.Production.notes=formValues.notes;
        this.snackBar.open('Details inserted','okay');
        this.toastr.success("Details inserted","SUCCESS");
        console.log(this.Production)
        this.productionSrv.insertProductionDetails(this.Production).subscribe((res:any)=>{
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
  delete(){
    this.Production.mode="Delete";
    this.Production.tranNo=this.TranNo;
    this.productionSrv.deleteProductionDetails(this.Production).subscribe((res:any)=>{
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
  update(){
    //debugger;
    console.log(this.ProductionForm.value);
    if(this.ProductionForm.invalid){
      this.snackBar.open('Please enter required fields','okay');
      this.toastr.error("please enter required details","ERROR");

      return;
    }
    else{
      try{
        const formValues=this.ProductionForm.value;
        this.Production.mode="Update";
        this.Production.tranNo=this.TranNo;
        this.Production.date=formValues.date;
        this.Production.session=formValues.session;
        this.Production.notes=formValues.notes;
        this.snackBar.open('Details inserted','okay');
        this.toastr.success("Details updated","SUCCESS");
        console.log(this.Production)
        this.productionSrv.updateProductionDetails(this.Production).subscribe((res:any)=>{
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
    this.Production.tranNo=this.TranNo;
    this.Production.mode = 'Get';
    console.log(this.Production);
    this.productionSrv.GetProductionDetails(this.Production).subscribe((res:any)=>{
      console.log(res);
      if(res.status==="Success")
        {
        //  this.ProductionForm.controls['mode'].setValue(res.mode);
        //  this.ProductionForm.controls['date'].setValue(res.date);
        //  this.ProductionForm.controls['session'].setValue(res.session);
        //  this.ProductionForm.controls['notes'].setValue(res.notes);
        this.ProductionForm.patchValue({
           'mode':res.mode,
           'date':res.date,
           'session':res.session,
           'notes':res.notes
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
    Clear(){  
  //  this.tranNo="";
    this.formInit();
      this.msg="";
     this.textcolor="";
  }

}

