import { ColDef } from 'ag-grid-community';
import { SalesCls } from './../Classes/SalesClass';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customer, SalesService } from '../sales.service';
import { map, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ExcelExportService } from '../excel-export.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {


  public SalesDetailsForm!: FormGroup;
  public saleCls!: SalesCls;
  public msg!: string;
  public textcolor!: string;
  CustId :number=0;
  SaleDate !:Date;
  customers: customer[] = [];
  selectedCustomerId: number | null = null;
  filteredCustomers: any;
  totalLiters: number = 0;
  totalAmount: number = 0;
  lastRecord :any;
  public originalData: any;
  word!: string;
  selectedID: any;
  salesData: any = null;
  errorMessage: string = '';

  gridOptions = {
    headerHeight: 24,
    }
  rowData:any = [];
  filteredData: any[] = [];

  colDefs:any[]=[
    {headerName:'CustomerId',field:'customerId',width: 100},
    {
      headerName: 'Customer Name', width: 130,
      valueGetter: (params: any) => {
        const customer = this.customers.find(c => c.customerId === params.data.customerId);
        return customer ? customer.customerName : '';
      }
    },
    {headerName:'SaleDate',field:'saleDate',width: 130,
      valueFormatter: function(params: { value: string | number | Date; }) {
        if (!params.value) return '';
        const date = new Date(params.value);
        return date.toISOString().substring(0, 10);
      }
    },
    {headerName:'Item',field:'item',width: 100},
    {headerName:'Quantity',field:'quantity',width: 130},
    {headerName:'Rate',field:'rate',width: 130},
    {headerName:'Amount',field:'amount',width: 130},
    {headerName:'Actions', width: 120,
      cellRenderer: (params: any) => this.actionCellRenderer(params)}
  ]


  constructor(
    private saleSrv: SalesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private ExcelService:ExcelExportService
  ) {
    this.formInit();
    this.saleCls = new SalesCls();
  }

  displayClientName(customer: any): string {
    return customer ? customer.customerName : '';
  }

  ngOnInit() {
    this.loadClients();
    this.getAllSales();
    this.calculateTotals();

  }

  formInit() {
    this.SalesDetailsForm = this.fb.group({
      customerId: ['', Validators.required],
      saleDate: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['',Validators.required],
      Rate: ['', Validators.required],
      amount:['']
    });

    this.SalesDetailsForm.controls['quantity'].valueChanges.subscribe(() => {
      this.calculateAmount();
    });
    this.SalesDetailsForm.controls['Rate'].valueChanges.subscribe(() => {
      this.calculateAmount();
    });
  }

  loadClients() {
    this.saleSrv.getCustomer().subscribe(data => {
      this.customers = data;
      this.setupCustomerFiltering();
    });
  }
  exportToExcel(){
    this.ExcelService.exportAsExcelFile(this.rowData,'sample');
  }


  setupCustomerFiltering() {
    this.filteredCustomers = this.SalesDetailsForm.controls['customerId'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const customerName = typeof value === 'string' ? value : value?.customerName;
        return customerName ? this._filterCustomers(customerName as string) : this.customers.slice();
      }),
    );
  }

  private _filterCustomers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer => customer.customerName.toLowerCase().includes(filterValue));
  }

  calculateAmount() {
    const formValues = this.SalesDetailsForm.value;
    const quantity = formValues.quantity || 0;
    const Rate = formValues.Rate || 0;
    const amount =  Rate * quantity;

    this.SalesDetailsForm.patchValue({ amount: amount });
  }
  calculateTotals() {
    // this.totalLiters = this.rowData.reduce((sum: any, record: { quantity: any; }) => sum + record.quantity, 0);
    // this.totalAmount = this.rowData.reduce((sum: any, record: { amount: any; }) => sum + record.amount, 0);

    let totalLiters = 0;
    let totalAmount = 0;
    if (this.rowData && this.rowData.length > 0) {
    for (let i=0; i < this.rowData.length; i++){
      totalLiters += this.rowData[i].quantity;
      totalAmount +=this.rowData[i].amount;
    }
  }
  this.totalLiters = totalLiters;
  this.totalAmount = totalAmount;
  }

  actionCellRenderer(params: any) {
    const element = document.createElement('button');
    element.innerText = 'Edit';
    element.addEventListener('click', () => this.onEditClick(params));
    return element;
  }
  onEditClick(params: any) {
    const selectedData = params.data;
    console.log('Selected Data:', selectedData);
    console.log('Item Field:', selectedData.item);
    this.selectedID = selectedData.id;
    const selectedCustomer = this.customers.find(c => c.customerId === selectedData.customerId);
    this.SalesDetailsForm.patchValue({
      customerId: selectedData.customerId,
      saleDate: new Date(selectedData.saleDate),
      item:selectedData.item,
      quantity: selectedData.quantity,
      Rate:selectedData.Rate,
      amount:selectedData.amount
    })
    this.toastr.info('Record loaded for editing', 'Edit Mode');
  }
  search(){
    if (this.word === '') {
      this.rowData = this.originalData;
    } else {
      this.rowData = this.filterData(this.originalData, this.word);
    }
  }
  filterData(data: any[], word: string) {
    const lowercasedWord = word.toLowerCase();
    return data.filter((d: any) => {
      return d.customerId?.toString().toLowerCase().includes(lowercasedWord)
        // || d.customerName.toLowerCase().includes(lowercasedWord)
        || new Date(d.saleDate).toISOString().substring(0, 10).includes(lowercasedWord)
        || d.item?.toLowerCase().includes(lowercasedWord)
        || d.quantity?.toString().toLowerCase().includes(lowercasedWord)
        || d.Rate?.toString().toLowerCase().includes(lowercasedWord);
    });
  }
  refreshData() {
    this.saleSrv.getAllSales().subscribe((res: any) => {
      console.log('Refreshed Data:', res);
      this.rowData = res;
      this.originalData = [res];
      // this.gridOptions.api.setRowData(this.rowData);
    });
  }
  onRowClicked(event: any): void {
    const selectedData = event.data;
    const formattedDate = new Date(selectedData.saleDate);
    this.SalesDetailsForm.patchValue({
      customerId: selectedData.customerId,
      saleDate: formattedDate,
      item: selectedData.item,
      quantity: selectedData.quantity,
      Rate: selectedData.Rate,
      amount:selectedData.amount,
    });
  }

  getAllSales(){
   this.saleSrv.getAllSales().subscribe((res:any)=>{
    this.rowData = res;
    this.calculateTotals();
    this.originalData = res;
    this.filteredData = res;

   })
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    // Filter the grid data based on the selected date
    if (selectedDate) {
      const formattedDate = this.formatDate(selectedDate);
      this.filteredData = this.rowData.filter((row: { saleDate: string | number | Date; })  =>
        this.formatDate(new Date(row.saleDate)) === formattedDate
      );
    } else {
      this.filteredData = this.rowData;
    }
    this.getAllSales();

  }
  formatDate(saleDate: Date): string {
    const d = new Date(saleDate);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }



  submit() {
    //debugger;
    console.log(this.SalesDetailsForm.value)
    if (this.SalesDetailsForm.invalid) {
      this.toastr.error('Please fill in the required fields', 'ERROR');
      return;
    }
    this.prepareCls('Insert');
    this.calculateAmount();
    this.saleSrv.insertSalesDetails(this.saleCls).subscribe({
      next: (res: any) => {
        if (res.status === 'Success') {
          this.msg = res.dbMsg;
          this.textcolor = 'green';
          this.toastr.success('Sales details inserted successfully!', 'Success');
          this.getAllSales();
          this. refreshData();
        } else {
          this.msg = res.dbMsg;
          this.textcolor = 'red';
          this.toastr.error(res.dbMsg, 'ERROR');
        }
      },

      error: (error: HttpErrorResponse) => {
        console.error('Error Response:', error);
        this.msg = 'An error occurred. Please try again.';
        this.textcolor = 'red';
        this.toastr.error('An error occurred. Please try again.', 'ERROR');
      }
    });
  }

  Update(){
    console.log(this.SalesDetailsForm.value)
    if (this.SalesDetailsForm.invalid) {
      this.toastr.error('Please fill in the required fields', 'ERROR');
      return;
    }
    this.prepareCls('Update');
    this.calculateAmount();
    this.saleSrv.insertSalesDetails(this.saleCls).subscribe({
      next: (res: any) => {
        if (res.status === 'Success') {
          this.msg = res.dbMsg;
          this.textcolor = 'green';
          this.toastr.success('Sales details updated successfully!', 'Success');
          this.getAllSales();
          this. refreshData();
        } else {
          this.msg = res.dbMsg;
          this.textcolor = 'red';
          this.toastr.error(res.dbMsg, 'ERROR');
        }
      },

      error: (error: HttpErrorResponse) => {
        console.error('Error Response:', error);
        this.msg = 'An error occurred. Please try again.';
        this.textcolor = 'red';
        this.toastr.error('An error occurred. Please try again.', 'ERROR');
      }
    });
  }

  prepareCls(mode: string) {
    const formValues = this.SalesDetailsForm.value;
    this.saleCls.mode = mode;
    this.saleCls.customerId = formValues.customerId.customerId;
    this.saleCls.saleDate = formValues.saleDate;
    this.saleCls.item = formValues.item;
    this.saleCls.quantity = formValues.quantity;
    this.saleCls.Rate = formValues.Rate;
    this.saleCls.amount = formValues.amount;
  }

//   GetLastRecord() {
//     const customerId = this.SalesDetailsForm.controls['customerId'].value;
//     const filteredRecords = this.rowData.filter((record: { customerId: any; }) => record.customerId === customerId);
//     if (filteredRecords.length > 0) {
//       this.lastRecord = filteredRecords[filteredRecords.length - 1];
//       this.SalesDetailsForm.patchValue(this.lastRecord);
//     } else {
//       this.lastRecord = null;
//       this.toastr.warning('No records found for the selected customer ID', 'Warning');
//     }

//     this.saleCls.mode = 'Get';
//     this.saleCls.customerId = this.SalesDetailsForm.controls['customerId'].value.customerId;
//     this.saleSrv.GetSalesDetails(this.saleCls).subscribe((res: any) => {
//       if (res.status === 'Success') {
//         this.SalesDetailsForm.controls['saleDate'].setValue(res.saleDate);
//         this.SalesDetailsForm.controls['item'].setValue(res.item);
//         this.SalesDetailsForm.controls['quantity'].setValue(res.quantity);
//         this.SalesDetailsForm.controls['Rate'].setValue(res.rate);
//         this.SalesDetailsForm.controls['amount'].setValue(res.amount);

//         this.msg = res.dbMsg;
//         this.rowData = [res];
//         this.getAllSales();
//         this.textcolor = 'green';
//       } else {
//         this.msg = res.dbMsg;
//         this.textcolor = 'red';
//       }
//     });

//   }

Get(){
  const customerId = this.SalesDetailsForm.controls['customerId'].value;
      const filteredRecords = this.rowData.filter((record: { customerId: any; }) => record.customerId === customerId);
      if (filteredRecords.length > 0) {
        this.lastRecord = filteredRecords[filteredRecords.length - 1];
        this.SalesDetailsForm.patchValue(this.lastRecord);
      } else {
        this.lastRecord = null;
        this.toastr.warning('No records found for the selected customer ID', 'Warning');
      }

      this.saleCls.mode = 'Get';
      this.saleCls.customerId = this.SalesDetailsForm.controls['customerId'].value.customerId;
      this.saleSrv.GetSalesDetails(this.saleCls).subscribe((res: any) => {
        if (res.status === 'Success') {
          this.SalesDetailsForm.controls['saleDate'].setValue(res.saleDate);
          this.SalesDetailsForm.controls['item'].setValue(res.item);
          this.SalesDetailsForm.controls['quantity'].setValue(res.quantity);
          this.SalesDetailsForm.controls['Rate'].setValue(res.rate);
          this.SalesDetailsForm.controls['amount'].setValue(res.amount);

          this.msg = res.dbMsg;
          this.rowData = [res];
          this.getAllSales();
          this.textcolor = 'green';
        } else {
          this.msg = res.dbMsg;
          this.textcolor = 'red';
        }
      });

}
  delete(){
    //debugger
    console.log(this.SalesDetailsForm.value)
    if (this.SalesDetailsForm.invalid) {
      this.toastr.error('Please fill in the required fields', 'ERROR');
      return;
    }
    else {
      try {
        this.calculateAmount();
        this.prepareCls('Delete');
        this.saleSrv.insertSalesDetails(this.saleCls).subscribe((res: any) => {
          console.log(res);
          if (res.status === 'Success') {
            this.msg = res.dbMsg;
            this.textcolor = 'green';
            this.getAllSales();
            this. refreshData();
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

    // this.prepareCls('Delete');
    // this.calculateAmount();
    // this.saleSrv.insertSalesDetails(this.saleCls).subscribe({
    //   next: (res: any) => {
    //     if (res.status === 'Success') {
    //       this.msg = res.dbMsg;
    //       this.textcolor = 'green';
    //       this.toastr.success('Sales details deleted successfully!', 'Success');
    //       this.getAllSales();
    //     } else {
    //       this.msg = res.dbMsg;
    //       this.textcolor = 'red';
    //       this.toastr.error(res.dbMsg, 'ERROR');
    //     }
    //   },

    //   error: (error: HttpErrorResponse) => {
    //     console.error('Error Response:', error);
    //     this.msg = 'An error occurred. Please try again.';
    //     this.textcolor = 'red';
    //     this.toastr.error('An error occurred. Please try again.', 'ERROR');
    //   }
    // });
  }

  clear() {
    this.SalesDetailsForm.reset();
    this.msg = '';
    this.textcolor = '';

  }

  ngOnDestory():void {}
}
