import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,

} from '@angular/forms';
import { ClientDetailsCls } from '../Classes/ClientDetailsClass';
import { ClientsDetailsService } from '../clients-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  clientTypes = new FormControl([]);
  ClientTypesList: any = [
    { itemCode: 'Milk Supplier', itemName: 'Milk Supplier' },
    { itemCode: 'Employee', itemName: 'Employee' },
    { itemCode: 'FeedSupplier', itemName: 'Feed Supplier' },
    { itemCode: 'Medicine Supplier', itemName: 'Medicine Supplier' },
  ];

   rowData:any = [];

  colDefs: any[] = [
    { headerName: 'ClientId', field: 'clientId',width:100 },
    { headerName: 'Name', field: 'name',width:100  },
    { headerName: 'Type', field: 'type' ,width:100 },
    { headerName: 'ContactNumber1', field: 'contactNumber1',width:130  },
    { headerName: 'ContactNumber2', field: 'contactNumber2' ,width:130 },
    { headerName: 'ContactName', field: 'contactName' ,width:130 },
    { headerName: 'Email', field: 'email',width:130  },
    { headerName: 'Department', field: 'department',width:120  },
    { headerName: 'Designation', field: 'designation',width:120  },
    { headerName: 'Address1', field: 'address1',width:130  },
    { headerName: 'Address2', field: 'address2' ,width:130 },
    { headerName: 'Address3', field: 'address3',width:130  },
    { headerName: 'City', field: 'city' ,width:110 },
    { headerName: 'State', field: 'state',width:110  },
    { headerName: 'Country', field: 'country' ,width:110 },
    { headerName: 'Description', field: 'description',width:120  },
  ];

  gridOptions = {
    headerHeight :24
  };

  public clientDetailsForm!: FormGroup;
  public clientcls!: ClientDetailsCls;
  public getClientDetails!: number;
  public msg: string = '';
  public textcolor: string = '';
  ClientId!: number;
  data: any;
  word: string = "";
  originalData: any;

  constructor(
    private clientService: ClientsDetailsService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private toastr: ToastrService
  ) {
    this.formInit();
    this.clientcls = new ClientDetailsCls();
  }
  ngOnInit(): void {
  //   sessionStorage.setItem('user', 'Niharika');
  //   sessionStorage.setItem('data',JSON.stringify(this.rowData));

  //   let obj = sessionStorage.getItem('data');
  //   if (obj) {
  //   let parsedData = JSON.parse(obj); // Use JSON.parse() here
  //   console.log(parsedData);
  //   }
this.getAllClientData();

  }
  getAllClientData(){
    this.clientService.getData().subscribe((res: any) => {
      console.log(res);
      this.rowData = res;
     });
  }
  search(){
    // console.log('Before filtering:', this.rowData);
    // const filteredData = this.filterData(this.rowData, this.word);
    // console.log('After filtering:', filteredData);
    // this.rowData = filteredData;
    if (this.word === '') {
      this.rowData = this.originalData;
    } else {
      this.rowData = this.filterData(this.originalData, this.word);
    }

  }
  filterData(data: any[], word: string) {
    const lowercasedWord = word.toLowerCase();
    return data.filter((d: any) => {
      return d.clientId?.toString().toLowerCase().includes(lowercasedWord)
         || d.name?.toLowerCase().includes(lowercasedWord)
         || d.contactNumber1?.toLowerCase().includes(lowercasedWord)
         || d.contactName?.toLowerCase().includes(lowercasedWord)
         || d.email?.toString().toLowerCase().includes(lowercasedWord)
         || d.address1?.toLowerCase().includes(lowercasedWord)
         || d.city?.toLowerCase().includes(lowercasedWord)
         || d.state?.toLowerCase().includes(lowercasedWord);
    });
  }

  onRowClicked(event: any): void {
    const selectedData = event.data;
    this.clientDetailsForm.patchValue({
      clientId: selectedData.clientId,
      name: selectedData.name,
      type: selectedData.type.split(','),
      contactNumber1: selectedData.contactNumber1,
      contactNumber2: selectedData.contactNumber2,
      contactName: selectedData.contactName,
      email: selectedData.email,
      department: selectedData.department,
      designation: selectedData.designation,
      address1: selectedData.address1,
      address2: selectedData.address2,
      address3: selectedData.address3,
      city: selectedData.city,
      state: selectedData.state,
      country: selectedData.country,
      description: selectedData.description
    });
  }

  formInit() {
    this.clientDetailsForm = this.fb.group({
      clientId: ['', Validators.nullValidator],
      name: ['', Validators.required],
      type: ['', Validators.required],
      contactNumber1: ['', Validators.required],
      contactNumber2: ['', Validators.nullValidator],
      contactName: ['', Validators.required],
      email: ['', Validators.nullValidator],
      department: ['', Validators.nullValidator],
      designation: ['', Validators.nullValidator],
      address1: ['', Validators.required],
      address2: ['', Validators.nullValidator],
      address3: ['', Validators.nullValidator],
      city: ['', Validators.nullValidator],
      state: ['', Validators.nullValidator],
      country: ['', Validators.nullValidator],
      description: ['', Validators.nullValidator],
    });
  }
  submit() {
   // debugger
    console.log('from submit');
    console.log(this.clientDetailsForm.value);
    if (this.clientDetailsForm.invalid) {
      this.toastr.error('Please Enter Reqiured Feilds', 'ERROR');
      return;
    } else {
      try {
    const formValues = this.clientDetailsForm.value;
    this.clientcls.mode ='Insert' ;
    this.clientcls.clientId = this.ClientId;
    this.clientcls.name = formValues.name;
    this.clientcls.type = formValues.type.join(',');
    this.clientcls.contactNumber1 = formValues.contactNumber1;
    this.clientcls.contactNumber2 = formValues.contactNumber2;
    this.clientcls.contactName = formValues.contactName;
    this.clientcls.email = formValues.email;
    this.clientcls.department = formValues.department;
    this.clientcls.designation = formValues.designation;
    this.clientcls.address1 = formValues.address1;
    this.clientcls.address2 = formValues.address2;
    this.clientcls.address3 = formValues.address3;
    this.clientcls.city = formValues.city;
    this.clientcls.state = formValues.state;
    this.clientcls.country = formValues.country;
    this.clientcls.description = formValues.description;

        this.toastr.success('Details Inserted', 'SUCCESS');
        console.log(this.clientcls);
        this.clientService
          .insertClientDetails(this.clientcls)
          .subscribe((res: any) => {
            console.log(res);
            if (res.status === 'Success') {
              this.msg = res.dbMsg;
              this.textcolor = 'green';
              this.GetAllClients();
            } else {
              this.msg = res.dbMsg;
              this.textcolor = 'red';
            }
          });
      } catch (ex: any) {
        this.msg = ex.message;
        this.textcolor = 'red';
      } finally {
      }
    }
  }

  // prepareCls(mode: string) {
  //   const formValues = this.clientDetailsForm.value;
  //   this.clientcls.mode = mode;
  //   this.clientcls.clientId = this.ClientId;
  //   this.clientcls.name = formValues.name;
  //   this.clientcls.type = formValues.type.join(',');
  //   this.clientcls.contactNumber1 = formValues.contactNumber1;
  //   this.clientcls.contactNumber2 = formValues.contactNumber2;
  //   this.clientcls.contactName = formValues.contactName;
  //   this.clientcls.email = formValues.email;
  //   this.clientcls.department = formValues.department;
  //   this.clientcls.designation = formValues.designation;
  //   this.clientcls.address1 = formValues.address1;
  //   this.clientcls.address2 = formValues.address2;
  //   this.clientcls.address3 = formValues.address3;
  //   this.clientcls.city = formValues.city;
  //   this.clientcls.state = formValues.state;
  //   this.clientcls.country = formValues.country;
  //   this.clientcls.description = formValues.description;
  // }
  update() {
    console.log(this.clientDetailsForm.value);
    if (this.clientDetailsForm.invalid) {
      this.toastr.error('Please Enter Reqiured Feilds', 'ERROR');
      return;
    } else {
      try {
        const formValues = this.clientDetailsForm.value;
        this.clientcls.mode = 'Update';
        this.clientcls.clientId = this.ClientId;
        this.clientcls.name = formValues.name;
        this.clientcls.type = formValues.type.join(',');
        this.clientcls.contactNumber1 = formValues.contactNumber1;
        this.clientcls.contactNumber2 = formValues.contactNumber2;
        this.clientcls.contactName = formValues.contactName;
        this.clientcls.email = formValues.email;
        this.clientcls.department = formValues.department;
        this.clientcls.designation = formValues.designation;
        this.clientcls.address1 = formValues.address1;
        this.clientcls.address2 = formValues.address2;
        this.clientcls.address3 = formValues.address3;
        this.clientcls.city = formValues.city;
        this.clientcls.state = formValues.state;
        this.clientcls.country = formValues.country;
        this.clientcls.description = formValues.description;

        this.toastr.success('Details Updated', 'SUCCESS');
        console.log(this.clientcls);
        this.clientService
          .insertClientDetails(this.clientcls)
          .subscribe((res: any) => {
            console.log(res);
            if (res.status === 'Success') {
              this.msg = 'updated successfully';
              this.textcolor = 'green';
              this.GetAllClients();
            } else {
              this.msg = 'not updated';
              this.textcolor = 'red';
            }
          });
      } catch (ex: any) {
        this.msg = ex.message;
        this.textcolor = 'red';
      } finally {
      }
    }
  }

  Get() {
    this.clientcls.mode = 'Get';
    this.clientcls.clientId = this.getClientDetails;
    this.clientcls.clientId = this.ClientId;
    console.log(this.clientcls);
    this.clientService
      .GetClientDetails(this.clientcls)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'Success') {
          //this.clientDetailsForm.controls['clientId'].setValue(res.clientId)
          this.clientDetailsForm.controls['name'].setValue(res.name);
          const result: string[] = res.type.split(',');
          const trimmedResult: string[] = result.map((item) => item.trim());
          this.clientDetailsForm.controls['contactNumber1'].setValue(
            res.contactNumber1
          );
          this.clientDetailsForm.controls['contactNumber2'].setValue(
            res.contactNumber2
          );
          this.clientDetailsForm.controls['contactName'].setValue(
            res.contactName
          );
          this.clientDetailsForm.controls['email'].setValue(res.email);
          this.clientDetailsForm.controls['department'].setValue(
            res.department
          );
          this.clientDetailsForm.controls['designation'].setValue(
            res.designation
          );
          this.clientDetailsForm.controls['address1'].setValue(res.address1);
          this.clientDetailsForm.controls['address2'].setValue(res.address2);
          this.clientDetailsForm.controls['address3'].setValue(res.address3);
          this.clientDetailsForm.controls['city'].setValue(res.city);
          this.clientDetailsForm.controls['state'].setValue(res.state);
          this.clientDetailsForm.controls['country'].setValue(res.country);
          this.clientDetailsForm.controls['description'].setValue(
            res.description
          );
          this.toastr.success('Details Retrieved', 'SUCCESS');

          this.msg = res.dbMsg;
          this.textcolor = 'green';
        } else {
          this.toastr.error('Please Enter CliendId ', 'ERROR');
          this.msg = res.dbMsg;
          this.textcolor = 'red';
        }
      });
  }

  GetAllClients() {}
  Delete() {
    this.clientcls.mode = 'Delete';
    this.clientcls.clientId = this.ClientId;
    console.log(this.clientcls);
    this.clientService
      .GetClientDetails(this.clientcls)
      .subscribe((res: any) => {
        console.log(res);

        if (res.status === 'Success') {
          this.msg = res.dbMsg;
          this.textcolor = 'green';
          this.toastr.success('Details Deleted', 'SUCCESS');
        } else {
          this.snackbar.open('Please Enter CliendId ', 'Okay');
          this.toastr.error('Please Enter CliendId ', 'ERROR');
          this.msg = res.dbMsg;
          this.textcolor = 'red';
        }
      });
  }
  catch(ex: any) {
    this.msg = ex.message;
    this.textcolor = 'red';
  }
  finally() {}

  clear() {
    this.formInit();
    this.msg = '';
    this.textcolor = '';
  }
  ngOnDestroy(): void {}
}
