import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userDetailsCls } from '../Classes/userclass';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
        password: this.form.get('password')?.value,
         // Ensure mode is set correctly
      };

      this.userService.login(userData).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Login error', error);
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
