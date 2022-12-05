import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  template: `
    <form class="login-form" autocomplete="off" [formGroup]="loginForm" (ngSubmit)="submitForm()">

      <!--Username input-->
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="username" formControlName="username" placeholder="Username" required>
        <label for="username">Username</label>
      </div>
  
      <!--validates the username-->
      <div *ngIf="username.invalid && (username.dirty || username.touched)" class="alert alert-danger">
        <div *ngIf="username.errors?.['required']">
          Username is required.
        </div>
        <div *ngIf="username.errors?.['minlength']">
          Username must be at least 3 characters long.
        </div>
      </div>
  
      <!--Password input-->
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="password" placeholder="Password" required>
        <label for="password">Password</label>
      </div>
  
      <!--validates the password-->
      <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
        <div *ngIf="password.errors?.['required']">
          Password is required.
        </div>
        <div *ngIf="password.errors?.['minlength']">
          Password must be at least 5 characters long.
        </div>
      </div>

      <!--submit button-->
      <button class="btn btn-primary" type="submit" [disabled]="loginForm.invalid">Submit</button>

    </form>
  `,
  styles: [
    `.user-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ],
  styleUrls: ['../../styles.css']
})

export class LoginFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<User>();
  
  @Output()
  formSubmitted = new EventEmitter<User>();
  
  loginForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }
  
  ngOnInit() {
    this.initialState.subscribe(user => {
      this.loginForm = this.fb.group({
        username: [ user.username, [Validators.required] ],
        password: [ user.password, [ Validators.required, Validators.minLength(5) ] ],
      });
    });
  
    this.loginForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    console.log('submitted!');
    this.formSubmitted.emit(this.loginForm.value);
  }
}