import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cattle-details',
  templateUrl: './cattle-details.component.html',
  styleUrls: ['./cattle-details.component.css']
})
export class CattleDetailsComponent {
  // genders: string[] = ['Male', 'Female', 'Other'];
  // selectedGender: string;

  // constructor() {
  //   this.selectedGender = '';
  // }
  genderTypesList: string[] = ['MALE', 'FEMALE', 'OTHERS'];
  selectedGenderType = new FormControl('');
}
