import { ExcelExportService } from './../excel-export.service';
import { PurchaseDetailsService } from './../purchase-details.service';
import { purchaseDetailsCls } from './../Classes/PurchaseDetailsClass';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../purchase-details.service';
import { GridApi } from 'ag-grid-community';
import { HttpErrorResponse } from '@angular/common/http';
import { PdfgeneratorService } from '../pdfgenerator.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-purchace-details',
  templateUrl: './purchace-details.component.html',
  styleUrls: ['./purchace-details.component.css'],
})
export class PurchaceDetailsComponent implements OnInit {
 
  rowData: any = [];
  gridOptions = {
    headerHeight: 24, // Set the header height here
    onGridReady: (params: any) => {
      this.gridApi = params.api;
      this.getAllPurchaseDetails();
    }

  };

  colDefs: any[] = [
    { headerName: 'Client', field: 'clientId' },
    { headerName: 'PhoneNumber', field: 'phoneNumber' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'MilkType', field: 'milkType' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'SNF No', field: 'snf' },
    { headerName: 'Fat', field: 'fat' },
    { headerName: 'PricePerLiter', field: 'pricePerLiter' },
    { headerName: 'TotalPrice', field: 'totalPrice' },
    { headerName: 'Notes', field: 'notes' },
  ];

  public PurchaseDetailsForm!: FormGroup;
  public purchaseCls!: purchaseDetailsCls;
  public msg: string = '';
  public textcolor: string = '';
  ClientId!: number;
  public avgQuantity: number = 0;
  public avgSnf: number = 0;
  public avgFat: number = 0;
  public avgPricePerLiter: number = 0;
  public avgTotal: number = 0;
  public gridApi!:GridApi;

  clients: Client[] = [];
  selectedClientId: number | null = null;

  constructor(
    private purchaseSrv: PurchaseDetailsService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private toastr: ToastrService,
    private pdfGeneratorService: PdfgeneratorService,
    private ExcelService:ExcelExportService
  ) {
    this.formInit();
    this.purchaseCls = new purchaseDetailsCls();
  }
  exportToPdf(): void {
    this.pdfGeneratorService.exportToPdf('pdfTable', 'sample');
  }
 
  ngOnInit() {
    this.getAllPurchaseDetails();
    this.purchaseSrv.getClients().subscribe((data) => {
      console.log(data);
      this.clients = data;
    });
    this.PurchaseDetailsForm = this.fb.group({
      milkType: ['Buffalo Milk']  // Set default value here
    });
  }

  exportToExcel(){
    this.ExcelService.exportAsExcelFile(this.rowData,'sample');
  }

  formInit() {
    // const today = new Date();
    this.PurchaseDetailsForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      date: ['', Validators.required],
      milkType: ['', Validators.required],

      quantity: ['', Validators.required],
      pricePerLiter: ['', Validators.nullValidator],
      SNF: ['', Validators.required],
      fat: ['', Validators.required],
      totalPrice: ['', Validators.nullValidator],
      notes: ['', Validators.nullValidator],
    });
  }

  formatDecimal(controlName:string){
    let control = this.PurchaseDetailsForm.get(controlName);
    if(control && control.value){
      control.setValue(parseFloat(control.value).toFixed(4));
    }
  }

  submit() {
    //debugger
    console.log('from submit');
    console.log(this.PurchaseDetailsForm.value);
    if (this.PurchaseDetailsForm.invalid) {
      return;
    }
     else {
      try {
        this.prepareCls('Insert');
        this.purchaseSrv.insertPurchaseDetails(this.purchaseCls).subscribe((res: any) => {
          console.log(res);
          if (res.status === 'Success') {
            this.msg = res.dbMsg;
            this.textcolor = 'green';
           // this.getAllPurchaseDetails();
          } else {
            this.msg = res.dbMsg;
            this.textcolor = 'red';
          }

          (error: HttpErrorResponse) => {
            console.error('Error Response:', error); // Log the error response
            this.msg = 'An error occurred. Please try again.';
            this.textcolor = 'red';
          }
        });

      } catch (ex: any) {
        this.msg = ex.message;
        this.textcolor = 'red';
      }
    }
  }
  prepareCls(mode: string){
    const formValues = this.PurchaseDetailsForm.value;
    this.purchaseCls.mode = mode;
    this.purchaseCls.clientId = this.ClientId;
    this.purchaseCls.phoneNumber = formValues.phoneNumber;
    this.purchaseCls.date = formValues.date;
    this.purchaseCls.milkType = formValues.milkType;
    this.purchaseCls.quantity = formValues.quantity;
    this.purchaseCls.pricePerLiter = formValues.pricePerLiter;
    this.purchaseCls.SNF = formValues.SNF;
    this.purchaseCls.fat = formValues.fat;
    this.purchaseCls.totalPrice = formValues.totalPrice;
    this.purchaseCls.notes = formValues.notes;
  }

  update() {
    if (this.PurchaseDetailsForm.invalid) {
      this.snackbar.open('Please Enter Required Fields', 'okay');
      this.toastr.error('Please Enter Reqiured Feilds', 'ERROR');
      return;
    } else {
      try {
        this.prepareCls('Update')
        this.toastr.success('Details Updated', 'SUCCESS');
        this.purchaseSrv.insertPurchaseDetails(this.purchaseCls).subscribe((res: any) => {
          if (res.status === 'Success') {
            this.msg = 'updated successfully';
            this.textcolor = 'green';
           // this.getAllPurchaseDetails();
          } else {
            this.msg = 'not updated';
            this.textcolor = 'red';
          }
        });
      } catch (ex: any) {
        this.msg = ex.message;
        this.textcolor = 'red';
      }
    }
  }

  Get() {
    this.purchaseCls.mode = 'Get';
    this.purchaseCls.clientId = this.ClientId;
    this.purchaseSrv.GetPurchaseDetails(this.purchaseCls).subscribe((res: any) => {
      if (res.status === 'Success') {
        this.PurchaseDetailsForm.controls['phoneNumber'].setValue(res.phoneNumber);
        this.PurchaseDetailsForm.controls['date'].setValue(res.date);
        this.PurchaseDetailsForm.controls['milkType'].setValue(res.milkType);
        this.PurchaseDetailsForm.controls['quantity'].setValue(res.quantity);
        this.PurchaseDetailsForm.controls['pricePerLiter'].setValue(res.pricePerLiter);
        this.PurchaseDetailsForm.controls['SNF'].setValue(res.snf);
        this.PurchaseDetailsForm.controls['fat'].setValue(res.fat);
        this.PurchaseDetailsForm.controls['totalPrice'].setValue(res.totalPrice);
        this.PurchaseDetailsForm.controls['notes'].setValue(res.notes);

        this.msg = res.dbMsg;
        this.textcolor = 'green';
        this.rowData = [res];
        let totalQuantity = 0;
        let totalSnf = 0;
        let totalFat = 0;
        let totalPricePerLiter = 0;
        let totalPrice = 0;
        for (let i = 0; i < this.rowData.length; i++) {
          totalQuantity += this.rowData[i].quantity;
          totalSnf += this.rowData[i].snf;
          totalFat += this.rowData[i].fat;
          totalPricePerLiter += this.rowData[i].pricePerLiter;
          totalPrice += this.rowData[i].totalPrice;
        }

        const len = this.rowData.length;
        this.avgQuantity = totalQuantity / len;
        this.avgSnf = totalSnf / len;
        this.avgFat = totalFat / len;
        this.avgPricePerLiter = totalPricePerLiter / len;
        this.avgTotal = totalPrice / len;

        // this.getAllPurchaseDetails();
      } else {
        this.msg = res.dbMsg;
        this.textcolor = 'red';
      }
    });
  }

  GetMultiple() {
    this.purchaseSrv.getAllPurchaseData().subscribe((res: any) => {
      this.rowData = res.filter((item: any) => item.clientId === this.ClientId);
      let totalQuantity = 0;
      let totalSnf = 0;
      let totalFat = 0;
      let totalPricePerLiter = 0;
      let totalPrice = 0;

      for (let i = 0; i < this.rowData.length; i++) {
        totalQuantity += this.rowData[i].quantity;
        totalSnf += this.rowData[i].snf;
        totalFat += this.rowData[i].fat;
        totalPricePerLiter += this.rowData[i].pricePerLiter;
        totalPrice += this.rowData[i].totalPrice;
      }

      const len = this.rowData.length;
      this.avgQuantity = totalQuantity / len;
      this.avgSnf = totalSnf / len;
      this.avgFat = totalFat / len;
      this.avgPricePerLiter = totalPricePerLiter / len;
      this.avgTotal = totalPrice / len;

    });

  }

  delete() {
    this.purchaseCls.mode = 'Delete';
    this.purchaseCls.clientId = this.ClientId;
    this.purchaseSrv.GetPurchaseDetails(this.purchaseCls).subscribe((res: any) => {
      if (res.status === 'Success') {
        this.msg = res.dbMsg;
        this.textcolor = 'green';
        this.PurchaseDetailsForm.reset();
        this.getAllPurchaseDetails();
      } else {
        this.msg = res.dbMsg;
        this.textcolor = 'red';
      }
    });
  }

  getAllPurchaseDetails() {
    this.purchaseSrv.getAllPurchaseData().subscribe((res: any) => {
      this.rowData = res;
    });
  }

  clear() {
    this.formInit();
    this.msg = '';
    this.textcolor = '';
  }

 

}

