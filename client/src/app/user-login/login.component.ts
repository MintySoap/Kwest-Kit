import { Component, OnInit, inject, Injectable, Inject, NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { TopBarComponent } from '../general-home/top-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginFormComponent } from './login-form.component';

//<button class="btn btn-primary" [routerLink]="['registration']">Register</button>

@Component({
  selector: 'app-login',
  template: `
    <div id="bg"></div>
    <app-top-bar></app-top-bar>
    <h1 class="text-center m-5" style="color: white; background-color: black; position: relative; z-index: 10;">Login</h1>
    <app-login-form style = "position: relative; z-index: 10;" (formSubmitted)="login($event)"></app-login-form>
  `,
  styles: [],
  styleUrls: ['../../styles.css'],
  providers: [CookieService]
})

@Injectable({
  providedIn: 'root'
})


//note: so I think the reason why everything is going to shit is because I'm using Angular14, but I was using ngx-cookie-service 15 which ain't compatible
export class LoginComponent implements OnInit{
  user: BehaviorSubject<User> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService,
  ) {}
  
  ngOnInit(): void{}

  //use AJAX here to deny entry if user is not found in database
  login(userInfo: User) {
    this.user.next(userInfo);

    const myObserver = {
      next: (val: User) => {
        console.log('uwu');
        if(val == null){
          alert('invalid result'); //todo: okay now i'm getting somewhere. now all i gotta do is use ajax to tell them to use a different password
          //todo: also i gotta do the same thing with password        
        }
        else{
          console.log(val._id);
          //problem: cookieService keeps fucking up the login page for some reason
          this.cookieService.set('userID', val._id!);
          this.router.navigate(['/KwestKit/questBoard']); //todo: change this from admin to main
        }
      },
      error: (err: Error) => {
        console.log('uwu');
        alert("failure: \n"+JSON.stringify(userInfo));
        console.error(err);
      },
    };

    const login_result = this.userService.verifyUser(userInfo.username || '', userInfo.password || '');
    login_result.subscribe(myObserver);
  }
}