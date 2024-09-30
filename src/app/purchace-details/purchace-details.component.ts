import { ExcelExportService } from './../excel-export.service';
import { PurchaseDetailsService } from './../purchase-details.service';
import { purchaseDetailsCls } from './../Classes/PurchaseDetailsClass';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../purchase-details.service';
import { GridApi } from 'ag-grid-community';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, startWith } from 'rxjs';
import { PdfgeneratorService } from '../pdfgenerator.service';

//import * as pdfMake from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-purchace-details',
  templateUrl: './purchace-details.component.html',
  styleUrls: ['./purchace-details.component.css'],
})
export class PurchaceDetailsComponent implements OnInit {
  totalPrice: number = 0;
  amount:number=12345678;
  rowData: any = [];
  gridOptions = {
    headerHeight: 24,
    onGridReady: (params: any) => {
      this.gridApi = params.api;
      this.getAllPurchaseDetails();
    }
  };

  colDefs: any[] = [
    { headerName: 'ClientId', field: 'clientId' ,width: 80 },
    {
      headerName: 'Client Name', width: 100,
      valueGetter: (params: any) => {
        const client = this.clients.find(c => c.clientId === params.data.clientId);
        return client ? client.name : '';
      }
    },
    { headerName: 'Date', field: 'date' ,width: 100,
      valueFormatter: function(params: { value: string | number | Date; }) {
        if (!params.value) return '';
        const date = new Date(params.value);
        return date.toISOString().substring(0, 10);
      }
  },
    { headerName: 'MilkType', field: 'milkType', width: 100},
    { headerName: 'Session', field: 'session',width: 80 },
    { headerName: 'Quantity', field: 'quantity' ,width: 80},
    { headerName: 'SNF No', field: 'snf',width: 75 },
    { headerName: 'Fat', field: 'fat',width: 60 },
    { headerName: 'PricePerLiter', field: 'pricePerLiter',width: 100},
    { headerName: 'TotalAmount', field: 'totalPrice',width: 105 },
    // { headerName: 'Notes', field: 'notes',width: 150 },
    {   headerName: 'Actions', width: 73,
      cellRenderer: (params: any) => this.actionCellRenderer(params)}
  ];

  public PurchaseDetailsForm!: FormGroup;
  public purchaseCls!: purchaseDetailsCls;
  public msg: string = '';
  public textcolor: string = '';
  ClientId: number=0;
  public avgQuantity: number = 0;
  public avgSnf: number = 0;
  public avgFat: number = 0;
  public avgPricePerLiter: number = 0;
  public avgTotal: number = 0;
  public gridApi!:GridApi;
  lastRecord :any;
  filteredClients!: Observable<any[]>;
  clients: Client[] = [];
  selectedClientId: number | null = null;
  selectedID: any;


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
  displayClientName(client: any): string {
    return client ? client.name : '';
  }
  exportToPdf(): void {
    // Map data to match table format
    // const tableData = this.rowData.map((item: { clientId: any; phoneNumber: any; date: any; milkType: any; quantity:any;snf:any;fat:any;pricePerLiter:any;totalPrice:any;notes:any;}) =>
    //    [item.clientId, item.phoneNumber, item.date, item.milkType,item.quantity,item.snf,item.fat,item.pricePerLiter,item.totalPrice,item.notes,]);

    // Call service to generate the PDF
    const colDefs = ['clientId', 'phoneNumber', 'date','milkType','quantity','snf','fat','pricePerLiter','totalPrice','notes']; // Define the columns based on object keys
    const title = 'Purchase Details'; // PDF title
    this.pdfGeneratorService.generatePdf(this.rowData, colDefs, title);
    }

  ngOnInit() {
    this.getAllPurchaseDetails();
    this.loadClients();
    this.setupValueChanges();

  }
  formInit() {
    const today = new Date();
    this.PurchaseDetailsForm = this.fb.group({
    clientId:[''],
    date: ['today', Validators.required],
    milkType: ['Buffalo Milk', Validators.required],
    session: ['', Validators.required],
    quantity: ['', Validators.required],
    pricePerLiter: ['', Validators.nullValidator],
    SNF: ['', Validators.required],
    fat: ['', Validators.required],
    totalPrice: ['', Validators.nullValidator],
    notes: ['', Validators.nullValidator],

  });
}

onRowClicked(event: any): void {
  const selectedData = event.data;
  const formattedDate = new Date(selectedData.date);
  this.PurchaseDetailsForm.patchValue({
    clientId: selectedData.clientId,
    date: formattedDate,
    milkType: selectedData.milkType,
    session: selectedData.session,
    quantity: selectedData.quantity,
    pricePerLiter:selectedData.pricePerLiter,
    SNF:selectedData.snf,
    fat:selectedData.fat,
    totalPrice:selectedData.totalPrice,
    notes: selectedData.notes
  });
}

  loadClients() {
    this.purchaseSrv.getClients().subscribe(data => {
      this.clients = data;
      this.setupClientFiltering();
    });
    this.PurchaseDetailsForm = this.fb.group({
      milkType: ['Buffalo Milk']  // Set default value here
    });
  }
  setupClientFiltering() {
    this.filteredClients = this.PurchaseDetailsForm.controls['clientId'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterClients(name as string) : this.clients.slice();
      }),
    );
  }
  setupValueChanges() {
    this.PurchaseDetailsForm.controls['SNF'].valueChanges.subscribe(() => this.calculatePricePerLiter());
    this.PurchaseDetailsForm.controls['fat'].valueChanges.subscribe(() => this.calculatePricePerLiter());
    this.PurchaseDetailsForm.controls['pricePerLiter'].valueChanges.subscribe(() => this.calculateTotalPrice());
    this.PurchaseDetailsForm.controls['quantity'].valueChanges.subscribe(() => this.calculateTotalPrice());
  }
  private _filterClients(value: string): any[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.clients.filter(client => client.name.toLowerCase().includes(filterValue));
  }
  calculatePricePerLiter() {
    const snf = this.PurchaseDetailsForm.controls['SNF'].value;
    const fat = this.PurchaseDetailsForm.controls['fat'].value;

    const priceMapping = [
      { snf: 8.00, fat: 5.00, pricePerLiter: 38.95 },
      { snf: 8.00, fat: 5.10, pricePerLiter: 39.75 },
      { snf: 8.00, fat: 5.20, pricePerLiter: 40.55 },
      { snf: 8.00, fat: 5.30, pricePerLiter: 41.35 },
      { snf: 8.00, fat: 5.40, pricePerLiter: 42.15 },
      { snf: 8.00, fat: 5.50, pricePerLiter: 42.95 },
      { snf: 8.00, fat: 5.60, pricePerLiter: 43.74 },
      { snf: 8.00, fat: 5.70, pricePerLiter: 44.54 },
      { snf: 8.00, fat: 5.80, pricePerLiter: 45.34 },
      { snf: 8.00, fat: 5.90, pricePerLiter: 46.14 },
      { snf: 8.00, fat: 6.00, pricePerLiter: 46.94 },
      { snf: 8.00, fat: 6.10, pricePerLiter: 47.74 }
    ];

    const foundPrice = priceMapping.find(p => p.snf === snf && p.fat === fat);

    if (foundPrice) {
      this.PurchaseDetailsForm.controls['pricePerLiter'].setValue(foundPrice.pricePerLiter.toFixed(2));
    } else {
      this.PurchaseDetailsForm.controls['pricePerLiter'].setValue('');
    }

    //  this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    const pricePerLiter = this.PurchaseDetailsForm.controls['pricePerLiter'].value;
    const quantity = this.PurchaseDetailsForm.controls['quantity'].value;

    if (pricePerLiter && quantity) {
      const totalPrice = pricePerLiter * quantity;
      this.PurchaseDetailsForm.controls['totalPrice'].setValue(totalPrice.toFixed(2));
    } else {
      this.PurchaseDetailsForm.controls['totalPrice'].setValue('');
    }
  }

  exportToExcel(){
    this.ExcelService.exportAsExcelFile(this.rowData,'sample');
  }

  formatDecimal(controlName:string){
    let control = this.PurchaseDetailsForm.get(controlName);
    if(control && control.value){
      control.setValue(parseFloat(control.value).toFixed(4));
    }
  }
  actionCellRenderer(params: any) {
    const element = document.createElement('button');
    element.innerText = 'Edit';
    element.addEventListener('click', () => this.onEditClick(params));
    return element;
  }
  onEditClick(params: any) {
    const selectedData = params.data;
    this.selectedID = selectedData.id;
    this.PurchaseDetailsForm.patchValue({
      clientId: selectedData.clientId,
      date: new Date(selectedData.date),
      milkType:selectedData.milkType,
      session: selectedData.session,
      quantity:selectedData.quantity,
      // pricePerLiter: selectedData.pricePerLiter,
      SNF :selectedData.snf,
      fat:selectedData.fat,
      // totalPrice: selectedData.totalPrice,
      notes: selectedData.notes
    });
    this.toastr.info('Record loaded for editing', 'Edit Mode');
  }

getAllPurchaseDetails() {
  this.purchaseSrv.getAllPurchaseData().subscribe((res: any) => {
    this.rowData = res;
  });
}

  submit() {
    //debugger
    // console.log('from submit');
    console.log(this.PurchaseDetailsForm.value);
    if (this.PurchaseDetailsForm.invalid) {
      this.toastr.error('Please fill in the required fields', 'ERROR');
      return;
    }
     else {
      try {
         this.calculatePricePerLiter();
         this.calculateTotalPrice()
        this.prepareCls('Insert');
        // const formValues = this.PurchaseDetailsForm.value;
        // this.purchaseCls.mode = 'Insert';
        // this.purchaseCls.clientId = formValues.clientId;
        // this.purchaseCls.date = formValues.date;
        // this.purchaseCls.milkType = formValues.milkType;
        // this.purchaseCls.session = formValues.session;
        // this.purchaseCls.quantity = formValues.quantity;
        // this.purchaseCls.pricePerLiter = formValues.pricePerLiter;
        // this.purchaseCls.SNF = formValues.SNF;
        // this.purchaseCls.fat = formValues.fat;
        // this.purchaseCls.totalPrice = formValues.totalPrice;
        // this.purchaseCls.notes = formValues.notes;
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
            console.error('Error Response:', error);
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

  prepareCls(mode: string){
    const formValues = this.PurchaseDetailsForm.value;
    console.log(formValues.clientId.clientId);

    this.purchaseCls.mode = mode;
    this.purchaseCls.clientId = formValues.clientId.clientId;
    this.purchaseCls.date = formValues.date;
    this.purchaseCls.milkType = formValues.milkType;
    this.purchaseCls.session = formValues.session;
    this.purchaseCls.quantity = formValues.quantity;
    this.purchaseCls.pricePerLiter = formValues.pricePerLiter;
    this.purchaseCls.SNF = formValues.SNF;
    this.purchaseCls.fat = formValues.fat;
    this.purchaseCls.totalPrice = formValues.totalPrice;
    this.purchaseCls.notes = formValues.notes;

    console.log('Prepared purchaseCls:', this.purchaseCls);
  }


  GetLastRecord() {
    const clientId = this.PurchaseDetailsForm.controls['clientId'].value;
    const filteredRecords = this.rowData.filter((record: { clientId: any; }) => record.clientId === clientId);
    if (filteredRecords.length > 0) {
      this.lastRecord = filteredRecords[filteredRecords.length - 1];
      this.PurchaseDetailsForm.patchValue(this.lastRecord);
    } else {
      this.lastRecord = null;
      this.toastr.warning('No records found for the selected client ID', 'Warning');
    }

    this.purchaseCls.mode = 'Get';
    this.purchaseCls.clientId = this.PurchaseDetailsForm.controls['clientId'].value.clientId;
    this.purchaseSrv.GetPurchaseDetails(this.purchaseCls).subscribe((res: any) => {
      if (res.status === 'Success') {
        this.PurchaseDetailsForm.controls['date'].setValue(res.date);
        this.PurchaseDetailsForm.controls['milkType'].setValue(res.milkType);
        this.PurchaseDetailsForm.controls['session'].setValue(res.session);
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
  clear() {
    this.PurchaseDetailsForm.reset();
    this.msg = '';
    this.textcolor = '';
  }
}

