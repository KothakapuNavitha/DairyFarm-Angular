import { ExcelExportService } from './../excel-export.service';
import { PurchaseRepotsService } from './../purchase-repots.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../purchase-details.service';
import { purchaseReportsCls } from '../Classes/PurchaseReportsClass';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-purchase-reports',
  templateUrl: './purchase-reports.component.html',
  styleUrls: ['./purchase-reports.component.css']
})
export class PurchaseReportsComponent {
  public PurchaseReportsForm!:FormGroup;
  public purchCls!:purchaseReportsCls;
 // ClientId!:number;
  public msg:string="";
  public textcolor:string="";
  public gridApi!:GridApi;

  clients: Client[] = [];
  selectedClientId: number | null = null;

 constructor(private purchaseService:PurchaseRepotsService,private fb:FormBuilder,private ExcelService: ExcelExportService){
  this.formInit();
  this.purchCls = new purchaseReportsCls();
  }

 formInit(){
  this.PurchaseReportsForm = this.fb.group({
  clientId :['',Validators.required],
  from_date :['',Validators.required],
  to_date :['',Validators.required],
  })
 }
 ngOnInit(){
 this.purchaseService.getClients().subscribe((data) => {
   console.log(data);
  this.clients = data;
 });
 this.loadPurchaseData();
 }

//  submit(){}

//  update(){}

  Get(){
   // debugger;
   if (this.PurchaseReportsForm.valid) {
    this.purchCls.mode = 'Get';
    this.purchCls.clientId = this.PurchaseReportsForm.get('clientId')?.value;
    this.purchCls.from_date = this.PurchaseReportsForm.get('from_date')?.value;
    this.purchCls.to_date = this.PurchaseReportsForm.get('to_date')?.value;

    this.purchaseService.GetPurchaseReports(this.purchCls).subscribe((res:any)=>{
      if(res && res.length > 0){
        // this.PurchaseReportsForm.controls['clientId'].setValue(res.clientId);
        // this.PurchaseReportsForm.controls['from_date'].setValue(res.from_date);
        // this.PurchaseReportsForm.controls['to_date'].setValue(res.to_date);
        this.rowData = res;
        this.gridApi.setRowData(this.rowData);
        this.msg = res.dbMsg;
        this.textcolor = 'green';
        this.calculateTotalsAndAverages();
      }
      else {
        this.msg = res.dbMsg;
        this.textcolor = 'red';
        this.rowData = [];
        this.gridApi.setRowData(this.rowData);

    }
  }, error => {
      console.error(error);
      this.msg = 'Error fetching data';
      this.textcolor = 'red';

    })
  }
}

//  Delete(){}

//  clear(){

//  }

rowData: any[] = [];

gridOptions = {
  headerHeight: 24,
  onGridReady: (params: any) => {
    this.gridApi = params.api;
    this.loadPurchaseData();
  }

}

colDefs = [
  { headerName: 'Client', field: 'clientId' },
  { headerName: 'PhoneNumber', field: 'phoneNumber' },
  { headerName: 'Date', field: 'date' },
  { headerName: 'MilkType', field: 'milkType' },
  { headerName: 'Quantity', field: 'quantity' },
  { headerName: 'SNF No', field: 'snf' },
  { headerName: 'Fat', field: 'fat' },
  { headerName: 'PricePerLiter', field: 'pricePerLiter' },
  { headerName: 'TotalPrice', field: 'totalPrice' },
  // { headerName: 'Notes', field: 'notes' },
];

totalQuantity: number = 0;
totalSnf: number = 0;
totalFat: number = 0;
totalPrice: number = 0;
avgQuantity: number = 0;
avgSnf: number = 0;
avgFat: number = 0;
avgPrice: number = 0;


exportToExcel(){
  this.ExcelService.exportAsExcelFile(this.rowData,'sample');
}

loadPurchaseData(): void {
  this.purchaseService.getAllPurchaseData().subscribe((data: any) => {
    this.rowData = data;
    console.log(this.rowData);
    this.calculateTotalsAndAverages();
  });
}

calculateTotalsAndAverages(): void {
  let totalQuantity = 0;
  let totalSnf = 0;
  let totalFat = 0;
  let totalPrice = 0;
  this.rowData.forEach(item => {
    totalQuantity += item.quantity;
    totalSnf += item.snf;
    totalFat += item.fat;
    totalPrice += item.totalPrice;
  });
  this.totalQuantity = totalQuantity;
  this.totalSnf = totalSnf;
  this.totalFat = totalFat;
  this.totalPrice = totalPrice;
  const len = this.rowData.length;
  this.avgQuantity = totalQuantity / len;
  this.avgSnf = totalSnf / len;
  this.avgFat = totalFat / len;
  this.avgPrice = totalPrice / len;
}

}
