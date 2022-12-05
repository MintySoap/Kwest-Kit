import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-site-description',
  template: `
  <div id="bg"></div>
    <div class = "text-warning">
    <app-top-bar></app-top-bar>
    <h1 text-align: center>About Me</h1>
    <mat-card>
      <mat-card-header><mat-card-title>Who are my users?</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          As a student and someone with ADHD, I believe that Kwest Kit would be of great help to people like me. However, I believe that Kwest Kit can be useful for anyone.
          Because the system is based around the user regulating themselves i.e. they can simply start the timer and do something else, one can instead use for any type of task that takes a certain amount of time
          whether it be sitting at a desk studying or working out. It can be for the unfocused student like me or the active go getter who simply wants some more fun in their life.
        </p>
      </mat-card-content>
    </mat-card>

    <span><br></span>

    <mat-card>
      <mat-card-header><mat-card-title>What is it that you want your users to get out of using the site?</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          In the end, I simply want the user's of my site to build the habit of focusing. By incentivizing users to set goals for themselves and focus on their goals,
          I hope that they can build the habit of actively striving to pursue whatever quest they want in life.
        </p>
      </mat-card-content>
    </mat-card>

    <span><br></span>

    <mat-card>
      <mat-card-header><mat-card-title>What problem are you trying to solve for the users of the site?</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          In today's world where practically everything is at our fingertips
          and we are constantly having entertainment and distractions thrown at us, focus is a valuable commodity. I want this site to help people build the habits
          of resisting these distractions and actively striving to achieve their goals.
        </p>
      </mat-card-content>
    </mat-card>

    <span><br></span>

    <mat-card>
      <mat-card-header><mat-card-title>What are the actions that you want the users to take once they have used your site?</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          Once my users have used my site, I want them to come up with a small core set of goals for themselves. These are their major quest lines.
          I then want them to make a character, put their quests onto the quest board and start questing!
        </p>
      </mat-card-content>
    </mat-card>
    </div>
  `,
  styles: ['h1 {text-align: center; font-size: 80px; padding: 10px;}', 'mat-card-title {font-size: 60px;}', 'mat-card-content {font-size: 20px;}', 'mat-card {padding: 10px;}'
  ],
  styleUrls: ['../../styles.css']
})
export class SiteDescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
