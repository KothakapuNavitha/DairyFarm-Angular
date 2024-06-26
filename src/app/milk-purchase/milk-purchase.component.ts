import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { milkPurchaseCls } from '../Classes/MilkPurchaceClass';
import { MilkPurchaseService } from '../milk-purchase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-milk-purchase',
  templateUrl: './milk-purchase.component.html',
  styleUrls: ['./milk-purchase.component.css']
})
export class MilkPurchaseComponent implements OnInit{
public milkPurchaseForm!:FormGroup;
public milkCls! :milkPurchaseCls;
getMilkPurchaseDetails!:string;
public msg:string="";
public textcolor:string="";
TranNumber!:string;

constructor(private milkService:MilkPurchaseService,private fb:FormBuilder,private snackbar:MatSnackBar,private toastr:ToastrService){
this.formInit();
this.milkCls= new milkPurchaseCls();
}

ngOnInit(){}
formInit(){
 this.milkPurchaseForm = this.fb.group({
tranNumber :['',Validators.required],
clientId :['',Validators.required],
uom	:['',Validators.required],
date :['',Validators.required],
quantity:['',Validators.required]	,
unitRate:['',Validators.required]	,
totalAmt:['',Validators.required]	,
fatContent	:['',Validators.required]	,
proteinContent:['',Validators.required]	,
latoseContent	:['',Validators.required]	,
totalSolidContent :['',Validators.required]	,
bacterialContent :['',Validators.required]	,
phLevel	:['',Validators.required],
antibioticResidue  :['',Validators.required]	,
qualitygrade	:['',Validators.required]	,

 })
}

submit() {
  console.log('from submit');
  console.log(this.milkPurchaseForm.value);
  if (this.milkPurchaseForm.invalid) {
    this.snackbar.open('Please enter required fields','Okay');
    this.toastr.error('Please Enter Reqiured Feilds','ERROR');
    return;
  } else {
    try {
      const formValues = this.milkPurchaseForm.value;
      this.milkCls.mode = 'Insert';
      this.milkCls.tranNumber = formValues.tranNumber;
      this.milkCls.clientId = formValues.clientId;
      this.milkCls.uom = formValues.uom;
      this.milkCls.date = formValues.date;
      this.milkCls.quantity = formValues.quantity;
      this.milkCls.unitRate = formValues.unitRate;
      this.milkCls.totalAmt = formValues.totalAmt;
      this.milkCls.fatContent = formValues.fatContent;
      this.milkCls.proteinContent = formValues.proteinContent;
      this.milkCls.latoseContent = formValues.latoseContent;
      this.milkCls.totalSolidContent = formValues.totalSolidContent;
      this.milkCls.bacterialContent = formValues.bacterialContent;
      this.milkCls.phLevel = formValues.phLevel;
      this.milkCls.antibioticResidue = formValues.antibioticResidue;
      this.milkCls.qualitygrade = formValues.qualitygrade;
      this.snackbar.open('Details Inserted','Okay');
      this.toastr.success('Details Inserted','SUCCESS')
      console.log(this.milkCls);
      this.milkService
        .insertMilkPurchaseDetails(this.milkCls)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status ==='Success') {
            this.msg = res.dbMsg;
            this.textcolor = "green";
          } else {
            this.msg = res.dbMsg;
            this.textcolor = "red";
          }
        });
    }
    catch (ex: any) {
      this.msg = ex.message;
      this.textcolor = 'red';
    }
    finally {}
  }
}

update(){
  console.log(this.milkPurchaseForm.value);
  if (this.milkPurchaseForm.invalid) {
    this.snackbar.open('Please Enter Required Fields','okay');
    this.toastr.error('Please Enter Reqiured Feilds','ERROR');
    return;
  } else {
    try {
      const formValues = this.milkPurchaseForm.value;
      this.milkCls.mode = 'Update';
      this.milkCls.tranNumber =formValues.tranNumber;
      this.milkCls.clientId = formValues.clientId;
      this.milkCls.uom = formValues.uom;
      this.milkCls.date = formValues.date;
      this.milkCls.quantity = formValues.quantity;
      this.milkCls.unitRate = formValues.unitRate;
      this.milkCls.totalAmt = formValues.totalAmt;
      this.milkCls.fatContent = formValues.fatContent;
      this.milkCls.proteinContent = formValues.proteinContent;
      this.milkCls.latoseContent = formValues.latoseContent;
      this.milkCls.totalSolidContent = formValues.totalSolidContent;
      this.milkCls.bacterialContent = formValues.bacterialContent;
      this.milkCls.phLevel = formValues.phLevel;
      this.milkCls.antibioticResidue = formValues.antibioticResidue;
      this.milkCls.qualitygrade = formValues.qualitygrade;
      this.snackbar.open('Details Updated','Okay');
      this.toastr.success('Details Updated','SUCCESS')
      console.log(this.milkCls);
      this.milkService
        .insertMilkPurchaseDetails(this.milkCls)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status==='Success') {
            this.msg = "updated successfully";
            this.textcolor = "green";
          } else {
            this.msg = "not updated";
            this.textcolor = "red";
          }
        });
    }
    catch (ex: any) {
      this.msg = ex.message;
      this.textcolor = 'red';
    }
    finally {}
  }
}

Get(){
   this.milkCls.mode = 'Get';
   this.milkCls.tranNumber = this.getMilkPurchaseDetails;
   this.milkCls.tranNumber = this.TranNumber;
   console.log(this.milkCls);
   this.milkService.GetMilkPurchaseDetails(this.milkCls).subscribe((res:any)=>{
    console.log(res);
    if(res.status==="Success"){
      //this.milkPurchaseForm.controls['tranNumber'].setValue(res.tranNumber)
      this.milkPurchaseForm.controls['clientId'].setValue(res.clientId);
      this.milkPurchaseForm.controls['uom'].setValue(res.uom);
      this.milkPurchaseForm.controls['date'].setValue(res.date);
      this.milkPurchaseForm.controls['quantity'].setValue(res.quantity);
      this.milkPurchaseForm.controls['unitRate'].setValue(res.unitRate);
      this.milkPurchaseForm.controls['totalAmt'].setValue(res.totalAmt);
      this.milkPurchaseForm.controls['fatContent'].setValue(res.fatContent);
      this.milkPurchaseForm.controls['proteinContent'].setValue(res.proteinContent);
      this.milkPurchaseForm.controls['latoseContent'].setValue(res.latoseContent);
      this.milkPurchaseForm.controls['totalSolidContent'].setValue(res.totalSolidContent);
      this.milkPurchaseForm.controls['bacterialContent'].setValue(res.bacterialContent);
      this.milkPurchaseForm.controls['phLevel'].setValue(res.phLevel);
      this.milkPurchaseForm.controls['antibioticResidue'].setValue(res.antibioticResidue);
      this.milkPurchaseForm.controls['qualitygrade'].setValue(res.qualitygrade);
      this.snackbar.open('Details Retrieved','Okay');
      this.toastr.success('Details Retrieved','SUCCESS')

      this.msg = res.dbMsg;
      this.textcolor = "green";
    }
    else{
      this.snackbar.open('Please Enter CliendId ','Okay');
      this.toastr.error('Please Enter CliendId ','ERROR');
      this.msg = res.dbMsg;
      this.textcolor = "red";

    }
   })
}

Delete(){
 this.milkCls.mode='Delete';
 this.milkCls.tranNumber = this.TranNumber;
 console.log(this.milkCls);
 this.milkService.GetMilkPurchaseDetails(this.milkCls).subscribe((res:any)=>{
  console.log(res);

  if(res.status==="Success"){
    this.msg = res.dbMsg;
    this.textcolor = "green";
    this.snackbar.open('Details Deleted','Okay');
    this.toastr.success('Details Deleted','SUCCESS');

  }
  else{
    this.snackbar.open('Please Enter CliendId ','Okay');
    this.toastr.error('Please Enter CliendId ','ERROR');
    this.msg = res.dbMsg;
    this.textcolor = "red"
  }
 })
}
catch (ex:any) {
  this.msg = ex.message;
  this.textcolor = "red";
}
finally() {}

clear() {
  this.formInit();
  this.msg = "";
  this.textcolor = "";
}
ngOnDestroy():void{}


}
