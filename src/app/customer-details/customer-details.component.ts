import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerDetailsCls } from '../Classes/CustomerDetailsClass';
import { CustomerService } from '../customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
public CustomerDetailsForm!:FormGroup;
public customerCls!:CustomerDetailsCls;
custId!:number;
word:string="";
public msg:string="";
public textcolor:string="";
public originalData :any;
selectedID: any;

customerTypes = new FormControl([]);
CustomerTypesList: any = [
  { itemCode: 'Retail', itemName: 'Retail' },
  { itemCode: 'Wholesale', itemName: 'Wholesale' },
  { itemCode: 'Distributors', itemName: 'Distributors' },
  { itemCode: 'Local Shops', itemName: 'Local Shops' }
];

rowData:any = [];
colDefs :any[] =[
  {headerName: 'CustomerId',field:'customerId',width: 160},
  {headerName:'CustomerName',field:'customerName',width: 160},
  {headerName:'CustomerType',field:'customerType',width: 160},
  {headerName:'PhoneNumber',field:'phoneNumber',width: 150},
  {headerName:'Address',field:'address',width: 150},
  {headerName:'Actions', width: 120,
    cellRenderer: (params: any) => this.actionCellRenderer(params)}
];
gridOptions = {
  headerHeight :24
};

constructor(private customerSrv:CustomerService,private fb:FormBuilder,private snackbar:MatSnackBar,private toastr:ToastrService){
  this.formInit();
  this.customerCls = new CustomerDetailsCls
}

ngOnInit(){
  this.getAllCustomerData();
}
getAllCustomerData(){
  this.customerSrv.GetAllCustomerData().subscribe((res: any) => {
    console.log(res);
    this.rowData = res;
    this.originalData = res;
   });
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
      || d.customerName?.toString().toLowerCase().includes(lowercasedWord)
      || d.customerType?.toLowerCase().includes(lowercasedWord)
      || d.phoneNumber?.toLowerCase().includes(lowercasedWord)
      || d.address?.toLowerCase().includes(lowercasedWord);
  });
}
refreshData() {
  this.customerSrv.GetAllCustomerData().subscribe((res: any) => {
    console.log('Refreshed Data:', res);
    this.rowData = res;
    this.originalData = [res];
    // this.gridOptions.api.setRowData(this.rowData);

  });
}

onRowClicked(event: any): void {
  const selectedData = event.data;
  this.CustomerDetailsForm.patchValue({
    CustomerId: selectedData.customerId,
    CustomerName: selectedData.customerName,
    CustomerType: selectedData.customerType.split(','),
    PhoneNumber: selectedData.phoneNumber,
    Address: selectedData.address,
  });
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
  this.CustomerDetailsForm.patchValue({
    CustomerId: selectedData.CustomerId,
    CustomerName: selectedData.customerName,
    CustomerType:selectedData.customerType,
    PhoneNumber: selectedData.phoneNumber,
    Address:selectedData.address
  })
  this.toastr.info('Record loaded for editing', 'Edit Mode');
}

formInit(){
  this.CustomerDetailsForm = this.fb.group({
    CustomerId: ['', Validators.nullValidator],
    CustomerName: ['', Validators.required],
    CustomerType: ['', Validators.required],
    PhoneNumber: ['', Validators.required],
    Address: ['', Validators.nullValidator],
  });
}
submit(){
  console.log('from submit');
  console.log(this.CustomerDetailsForm.value);
  if (this.CustomerDetailsForm.invalid) {
    return;
  }
  else {
    try {
      this.prepareCls('Insert');
      this.customerSrv.insertCustomerDetails(this.customerCls).subscribe((res: any) => {
        console.log(res);
        if (res.status === 'Success') {
          this.msg = res.dbMsg;
          this.textcolor = 'green';
          this.refreshData();
        } else {
          this.msg = res.dbMsg;
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
  const formValues = this.CustomerDetailsForm.value;
  this.customerCls.mode = mode;
  this.customerCls.CustomerId = this.custId;
  this.customerCls.CustomerName = formValues.CustomerName;
  this.customerCls.CustomerType = formValues.CustomerType[0];
  this.customerCls.PhoneNumber = formValues.PhoneNumber;
  this.customerCls.Address = formValues.Address;

}
update(){
  if (this.CustomerDetailsForm.invalid) {
    this.toastr.error('Please Enter Reqiured Feilds', 'ERROR');
    return;
  } else {
    try {
      this.prepareCls('Update')
      this.toastr.success('Details Updated', 'SUCCESS');
      this.customerSrv.insertCustomerDetails(this.customerCls).subscribe((res: any) => {
        if (res.status === 'Success') {
          this.msg = 'updated successfully';
          this.textcolor = 'green';
          this.refreshData();

}
else {
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
Get(){
  //debugger
  this.customerCls.mode = 'Get';
  this.customerCls.CustomerId = this.custId;
  if (!this.custId) {
    this.toastr.error('Please Enter CustomerId', 'ERROR');
    return;
  }
  this.customerSrv.GetCustomerDetails(this.customerCls).subscribe((res: any) => {
    console.log('API Response:', res);
    if (res.status === 'Success') {
      this.CustomerDetailsForm.setValue({
        CustomerId: res.customerId,
        CustomerName: res.customerName,
        CustomerType: [res.customerType],
        PhoneNumber: res.phoneNumber,
        Address: res.address
      });
      this.toastr.success('Details Retrieved','SUCCESS')

      this.msg = res.dbMsg;
      this.textcolor = "green";
    }
    else{
      this.toastr.error('res.dbMsg ','ERROR');
      this.msg = res.dbMsg;
      this.textcolor = "red";

    }
   })
}
Delete(){
  this.customerCls.mode="Delete";
  this.customerCls.CustomerId=this.custId;
  this.customerSrv.GetCustomerDetails(this.customerCls).subscribe((res:any)=>{
    console.log(res);
    if(res.status=="Success")
      {
        this.msg=res.dbMsg;
        this.textcolor="green";
        this.refreshData();
      }
      else{
        this.msg=res.dbMsg;
        this.textcolor="red";
      }
  })
}
clear(){
  this.CustomerDetailsForm.reset();
  this.msg="";
  this.textcolor = "";
}
}
