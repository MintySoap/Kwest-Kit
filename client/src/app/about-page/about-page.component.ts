import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../general-home/top-bar.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-page',
  template: `
  <div id="bg"></div>
    <div class = "text-warning">
    <app-top-bar></app-top-bar>
    <h1 text-align: center>About Me</h1>
    <mat-card>
      <mat-card-header><mat-card-title>Who am I?</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          I'm many things. <br>
          Professionally I'm a computer science major here at GSU graduating in December 2022. I hope to pursue my masters in cyber security shortly after graduating.<br>
          Personally I'm a writer with a passion for story telling.<br>
          But over all I am... <br>
          <strong><i>Sleep Deprived</i></strong>
        </p>
      </mat-card-content>
    </mat-card>

    <span><br></span>

    <mat-card>
      <mat-card-header><mat-card-title>Project Description</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          Kwest Kit is a project that was created to make goal setting and achievement fun, essentially "gamifying" one's life to make it easier.
          The user has a character associated with their account. The user can then set quests for themselves, almost like an agenda.
          With each quest, the character will gain experience and level up, allowing the user to allocate points to
          there character's stats such as strength and speed. This progression will hopefully encourage users to focus for longer periods of time.
        </p>
      </mat-card-content>
    </mat-card>

    <span><br></span>

    <mat-card>
      <mat-card-header><mat-card-title>Technology Description</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          For this project I used: <br>
          *MongoDB for the database <br>
          *Express and NodeJS for the server <br>
          *Angular for the front end along with a variety of libraries such as Material which I used to make this these cards that you are seeing <br>
          *Amazon Web Services to host the website <br>
        </p>
      </mat-card-content>
    </mat-card>

    <span><br></span>

    <mat-card>
      <mat-card-header><mat-card-title>What Have I learned in this class?</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>
          This class gave me a solid basis for web development. I had tinkered with it before, but my basics were never solid enough to make enough progress.
          By taking the time to properly understand HTML, CSS, and Javascript, I was able to further understand how to go about my own personal studies regarding web development.
          Even now, I am still using all of the elements I learned in class (except PHP and React) to build this website.
        </p>
      </mat-card-content>
    </mat-card>
    </div>
  `,
  styles: ['h1 {text-align: center; font-size: 80px; padding: 10px;}', 'mat-card-title {font-size: 60px;}', 'mat-card-content {font-size: 20px;}', 'mat-card {padding: 10px;}'
  ],
  styleUrls: ['../../styles.css']
})
export class AboutPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
