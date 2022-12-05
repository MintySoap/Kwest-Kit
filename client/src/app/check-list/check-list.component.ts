import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { BootstrapOptions } from '@angular/core';

@Component({
  selector: 'app-check-list',
  template: `
    <div id="bg"></div>
      <div>
      <app-top-bar></app-top-bar>
      <h1 text-align: center style = 'z-axis: 10'> Check List </h1>
      <mat-card>
        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
          Database: MongoDB is used to hold the User's Login info as well as their character info and quests
        </div></mat-checkbox>

        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
          AJAX: AJAX is used in the quest board page which is behind the user login. 
          This quest board will automatically update with any quest that you add without refreshing which is the one of the main purposes of AJAX.
        </div></mat-checkbox>

        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
          Theme: For the theme, I tried to make it similar to a tavern that one would find in Dungeons and Dragons. Thus I tried to give the website a rustic warm feeling.
        </div></mat-checkbox>

        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
          New Library: On the server side I used various libraries and frameworks such as Express and Node.
            I also used RxJS to asynchronously retrieve data from MongoDB. On the client side, I used a great deal of Angular libraries including but not limited to
            the Angular core library, the platform-browser library, the router library, Angular's common library, Angular's material library,and ngx-cookies-service which is a library to manage cookies. I also used some boostrap.
        </div></mat-checkbox>

        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
            Javascript Usage: All of the logic written in this code is written in Typescript which is a superset of Javascript. i.e. TypeScript has all
            of Javascript within it but adds additional functionality. One example of dynamic functionality that I used Javascript for is basically all of the background
            functions for this website, especially accessing the database as I had to use nodeJS and Express as middleware which use Javascript.
        </div></mat-checkbox>

        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
          Membership Area: Once the user logs in, they can access the part of the website that allows them to create quests/tasks as well as create and manage their character. 
            They can then go on quests which are basically goals that they set out to complete for themselves by a set certain time that is shown on the on screen timer.
        </div></mat-checkbox>

        <mat-checkbox><div class="text-warning" style="font-size: 20px;">
          General User: The username is 'demouser' and the password is 'ThisIsForWPClass'
        </div></mat-checkbox>
      </mat-card>
      </div>
  `,
  styles: [ 'h1 {text-align: center; font-size: 80px; padding: 10px;}', 'mat-checkbox {padding: 10px;}'],
  styleUrls: ['../../styles.css']
})
//'client/node_modules/bootstrap/dist/css/bootstrap.min.css'
//client/node_modules/bootstrap/dist/js/bootstrap.min.js
export class CheckListComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
