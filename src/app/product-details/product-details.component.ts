import { Component ,OnDestroy,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDetailsCls } from '../Classes/ProductDetailsCls';
import { ProductDetailsService } from '../product-details.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  
  public  ProductDetails!: FormGroup;
  public productDetailsCls!: ProductDetailsCls;
  public getProductDetails!:string;
 Code!:string;
  public msg: string = "";
  public textColor: string = "";

  constructor (private formService:ProductDetailsService,private fb:FormBuilder,public snackbar:MatSnackBar,public toastr:ToastrService,private http:HttpClient){
    this.formInit();
    this.productDetailsCls=new ProductDetailsCls();

    
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void{

  }
  formInit(){
    this.ProductDetails=this.fb.group({
      SlNo:['',Validators.required],
      Code:['',Validators.nullValidator],
      Descrption:['',Validators.required],
      Type:['',Validators.required],
      UOM:['',Validators.required],
      StdRate:['',Validators.required],
      Notes:['',Validators.required]
    });
  }
  submit(){
    debugger;
    if(this.ProductDetails.invalid){
   
      this.snackbar.open('Enter Product Details','okay');
      this.toastr.error("Enter Product Details","400");
      return;
    }
    else{
      this.snackbar.open('Success','Okey');
      this.toastr.success(" Product Details Entered Successfully","Success");
      try{
        const formValues=this.ProductDetails.value;
        this.productDetailsCls.Mode = 'Insert';
        this.productDetailsCls.SlNo=formValues.SlNo;
        this.productDetailsCls.Code= formValues.Code;
        this.productDetailsCls.Descrption=formValues.Descrption;
        this.productDetailsCls.Type=formValues.Type;
        this.productDetailsCls.UOM=formValues.UOM;
        this.productDetailsCls.StdRate=formValues.StdRate;
        this.productDetailsCls.Notes=formValues.Notes;
        console.log(this.productDetailsCls)
        this.formService.insertProductDetails(this.productDetailsCls).subscribe((res:any)=>{
          console.log(res);

          if (res.status === "Success") {
            this.msg = res.dbMsg;
            this.textColor = "green";
          }
          else {
            this.msg = res.dbMsg;
            this.textColor = "red";
          }
        });

      }
      catch (ex: any) {
        this.msg = ex.message;
        this.textColor = "red";
      }
    }
    
  }
   Update() {
    if(this.ProductDetails.invalid){
     debugger;
      this.snackbar.open('Enter Product Details','okay');
      this.toastr.error("Enter Product Details","400");
      return;
    }
    else{
      this.snackbar.open('Success','Okey');
      this.toastr.success(" Product Details Updated Successfully","Success");
      try{
        const formValues=this.ProductDetails.value;
        this.productDetailsCls.Mode = 'Update';
        this.productDetailsCls.SlNo=formValues.SlNo;
        this.productDetailsCls.Code =formValues.Code;
        this.productDetailsCls.Descrption=formValues.Descrption;
        this.productDetailsCls.Type=formValues.Type;
        this.productDetailsCls.UOM=formValues.UOM;
        this.productDetailsCls.StdRate=formValues.StdRate;
        this.productDetailsCls.Notes=formValues.Notes;
        console.log(this.productDetailsCls)
        this.formService.insertProductDetails(this.productDetailsCls).subscribe((res:any)=>{
          console.log(res);

          if (res.status ==="Success") {
            this.msg = res.dbMsg;
            this.textColor = "green";
          }
          else {
            this.msg = res.dbMsg;
            this.textColor = "red";
          }
        });

      }
      catch (ex: any) {
        this.msg = ex.message;
        this.textColor = "red";
      }
      finally{

      }
   }
    
  }
  Get(){
    this.productDetailsCls.Mode='Get';
    this.productDetailsCls.Code=this.getProductDetails;
    this.productDetailsCls.Code=this.Code;
    console.log(this.productDetailsCls);
    this.formService.getProductDetails(this.productDetailsCls).subscribe((res:any)=>{
      console.log(res);
      if(res.status=='Success'){
        this.toastr.success("Details Retrived Successfully");
        this.ProductDetails.controls['SlNo'].setValue(res.slNo);
        this.ProductDetails.controls['Descrption'].setValue(res.descrption);
        this.ProductDetails.controls['Type'].setValue(res.type);
        this.ProductDetails.controls['UOM'].setValue(res.uom);
        this.ProductDetails.controls['StdRate'].setValue(res.stdRate);
        this.ProductDetails.controls['Notes'].setValue(res.notes);
        this.msg = res.dbMsg;
        this.textColor = "green";
      }
      else {
        this.toastr.error("Enter Farmer Name","400");


        this.msg = res.dbMsg;
        this.textColor = "red";
      }



    })
  }
      

    

  
  Delete(){
   
    this.productDetailsCls.Mode='Delete';
    this.productDetailsCls.Code=this.Code;
    console.log(this.productDetailsCls);
    this.formService.getProductDetails(this.productDetailsCls).subscribe((res:any)=>{
      console.log(res);
        if(res.status=="Success"){
          this.toastr.success("Status Has Been Updated  Successfully");

          this.msg=res.dbMsg;
          this.textColor="Green";
        }
        else {
          this.msg = res.dbMsg;
          this.textColor = "red";
        }
       
      })
    
   
  }
  Clear(){
    this.Code = "";
    this.formInit();
    this.msg = "";
    this.textColor = "";
  }

}
