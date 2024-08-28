import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userDetailsCls } from '../Classes/userclass';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  public form!: FormGroup;
  private formSubmitAttempt!: boolean;
  public userCls!: userDetailsCls;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formInit();
    this.userCls = new userDetailsCls();
  }

  ngOnInit() {}

  formInit() {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]{3,}$')]], // example pattern
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9@#*_]{6,}$')]] // example pattern
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const userData: userDetailsCls = {
        userName: this.form.get('userName')?.value,
        password: this.form.get('password')?.value
      };

      this.userService.signup(userData).subscribe(
        (response: any) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Signup error', error);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
    } else {
      this.formSubmitAttempt = true;
    }
  }

  OnCancel() {
    this.form.reset();
    this.router.navigate(['/']);
  }
}


