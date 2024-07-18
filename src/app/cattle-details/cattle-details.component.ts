import { CattledetailsService } from './../cattle-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community'
import { CattleDetailsCls } from '../Classes/CatteleDetailsClass';
@Component({
  selector: 'app-cattle-details',
  templateUrl: './cattle-details.component.html',
  styleUrls: ['./cattle-details.component.css']
})
export class CattleDetailsComponent implements OnInit {
  //drop dowen//
  cattleTypes = [
    { id: 1, name: 'Cow' },
    { id: 2, name: 'Buffalo' },
    { id: 3, name: 'Dual-purpose' }
  ];

  breedsByCattleType: { [key: number]: string[] } = {
    1: ['Holstein', 'Jersey', 'Guernsey'],
    2: ['Angus', 'Hereford', 'Simmental'],
    3: ['SimAngus', 'Beefmaster', 'Brangus']
  };
  //grid method//
  rowData= [];

  colDefs: any[] = [
    { headerName: 'Cattle Id', field: "Cattle Id" },
    {  headerName: 'Client Name',field: "Client Name" },
    {  headerName: 'Tag No',field: "Tag No" },
    {  headerName: 'Cattle Type', field: "Cattle Type" },
    {  headerName: 'Breed', field: "Breed" },
    {  headerName: 'Color', field: "Color" },
    {  headerName: 'Age',field: "Age" },
    {  headerName: 'Gender', field: "Gender" },
    {  headerName: 'Health Status', field: "Health Status" },
    {  headerName: 'Milk Session', field: "Milk Session" },
    {  headerName: 'Quantity',field: "Quantity" },
    {  headerName: 'Description',field: "Description" },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100
  }

  breeds: string[] = [];

  public cattleForm!: FormGroup;
  public cattleCls!: CattleDetailsCls;

  public getCattleId: string = "";
  public getClientId: string = "";
  public msg: string = "";
  public textColor: string = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private CattleService:CattledetailsService) {
    this.formInit();
    this.cattleCls = new CattleDetailsCls();
  }
  getUser() {
    this.http.get("https://localhost:7039/api/Dairy/Get_cattleDetails").subscribe((res: any) => {
      this.rowData = res;
    })
  }

  ngOnInit(): void {
    this.cattleForm.get('cattleType')!.valueChanges.subscribe(cattleType => this.onCattleTypeChange(cattleType));
    this.getUser();
  }
  onCattleTypeChange(cattleTypeId: number) {
    this.breeds = this.breedsByCattleType[cattleTypeId] || [];
    this.cattleForm.get('breed')!.setValue('');
  }

  formInit(): void {
    this.cattleForm = this.fb.group({
      clientId: ['', Validators.required],
      cattleId: ['', Validators.required],
      cattleType: ['Select', Validators.required],
      tagNo: ['', Validators.required],
      colour: ['', Validators.required],
      breed: ['Select', Validators.required],
      approxAge: ['', Validators.nullValidator],
      gender: ['Select', Validators.required],
      milkSession: ['', Validators.required],
      healthStatus: ['', Validators.required],
      quantity: ['', Validators.nullValidator],
      description: ['', Validators.nullValidator]
    });
  }

  changeCattleType(cattleType: any) {
    if (cattleType) {
      this.breeds = this.breedsByCattleType[cattleType.id] || [];
    } else {
      this.breeds = [];
    }
  }

  submit() {
    console.log('from submit');
    console.log(this.cattleForm.value);
    if (this.cattleForm.invalid) {
      return;
    }
    else {
      try {
        const formValues = this.cattleForm.value;
        this.cattleCls.mode = 'Insert';
        this.cattleCls.cattleId = "0";
        this.cattleCls.clientId = formValues.clientId;
        this.cattleCls.cattleType = formValues.cattleType;
        this.cattleCls.tagNo = formValues.tagNo;
        this.cattleCls.colour = formValues.colour;
        this.cattleCls.breed = formValues.breed;
        this.cattleCls.approxAge = formValues.approxAge;
        this.cattleCls.gender = formValues.gender;
        this.cattleCls.milkSession = formValues.milkSession;
        this.cattleCls.quantity = formValues.quantity
        this.cattleCls.healthStatus = formValues.healthStatus;
        this.cattleCls.description = formValues.description;


        console.log(this.cattleCls);
        this.CattleService.InsertcattleDetails(this.cattleCls).subscribe((response: any) => {
          console.log(response);
          if (response.status === "Success") {
            this.msg = response.dbMsg;
            this.textColor = "green"
          }
          else {
            this.msg = response.dbMsg;
            this.textColor = "red";
          }
        });
      }

      catch (ex: any) {
        this.msg = ex.message;
        this.textColor = 'red';
      }
      finally { }
    }
  }

  update(): void {
    console.log('from submit');
    console.log(this.cattleForm.value);
    if (this.cattleForm.invalid) {
      return;
    }
    else {
      try {
        const formValues = this.cattleForm.value;
        this.cattleCls.mode = 'Update';
        this.cattleCls.cattleId = formValues.cattleId;
        this.cattleCls.clientId = formValues.clientId;
        this.cattleCls.cattleType = formValues.cattleType;
        this.cattleCls.tagNo = formValues.tagNo;
        this.cattleCls.colour = formValues.colour;
        this.cattleCls.breed = formValues.breed;
        this.cattleCls.approxAge = formValues.approxAge;
        this.cattleCls.gender = formValues.gender;
        this.cattleCls.milkSession = formValues.milkSession;
        this.cattleCls.quantity = formValues.quantity
        this.cattleCls.healthStatus = formValues.healthStatus;
        this.cattleCls.description = formValues.description;


        console.log(this.cattleCls);
        this.CattleService.InsertcattleDetails(this.cattleCls).subscribe((response: any) => {
          console.log(response);
          if (response.status === 'Success') {
            this.msg = response.dbMsg;
            this.textColor = 'green';
          } else {
            this.msg = response.dbMsg;
            this.textColor = 'red';
          }
        });
      }
      catch (ex: any) {
        this.msg = ex.message;
        this.textColor = 'red';
      }
      finally {

      }
    }
  }
  get() {
    this.cattleCls.mode = 'Get';

    this.cattleCls.cattleId = this.getCattleId;
    this.cattleCls.clientId = this.getClientId;
    console.log(this.cattleCls);
    this.CattleService.GetDeleteCattleDetails(this.cattleCls).subscribe((response: any) => {
      console.log(response)
      if (response.status === "Success") {
        this.cattleForm.controls['cattleType'].setValue(response.cattleType)
        this.cattleForm.controls['tagNo'].setValue(response.tagNo)
        this.cattleForm.controls['colour'].setValue(response.colour)
        this.cattleForm.controls['breed'].setValue(response.breed)
        this.cattleForm.controls['approxAge'].setValue(response.approxAge)
        this.cattleForm.controls['gender'].setValue(response.gender)
        this.cattleForm.controls['milkSession'].setValue(response.milkSession)
        this.cattleForm.controls['quantity'].setValue(response.quantity)
        this.cattleForm.controls['healthStatus'].setValue(response.healthStatus)
        this.cattleForm.controls['description'].setValue(response.description)
        console.log(response);
        this.msg = response.dbMsg;
        this.textColor = "green";
      }
      else {
        this.msg = response.dbMsg;
        this.textColor = "red";
      }
    })

  }

  clear(): void {
    this.formInit();
    this.msg = "";
    this.cattleForm.reset({
      cattleType: 'Select',
      gender: 'Select',

    });
  }
  delete(): void {
    this.cattleCls.mode = 'Delete';
    this.cattleCls.cattleId = this.getCattleId;
    this.cattleCls.clientId = this.getClientId;
    console.log(this.cattleCls);
    this.CattleService.GetDeleteCattleDetails(this.cattleCls).subscribe((response: any) => {
      console.log(response)
      if (response.ststus === "Success") {
        this.msg = response.dbMsg;
        this.textColor = "green";
      }
      else {
        this.msg = response.dbMsg;
        this.textColor = "red";
      }
    })

  }
  catch(ex: any) {
    this.msg = ex.message;
    this.textColor = 'red';
  }


}



