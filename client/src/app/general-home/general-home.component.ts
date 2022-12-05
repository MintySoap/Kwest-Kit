import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-general-home',
  template: `
    <div id="bg"></div>
    <app-top-bar></app-top-bar>
    <mat-card>
      <div class="wrapper">
        <img mat-card-image src="../../assets/NoticeBoard.jpg" class="big-img">
        <img mat-card-image src="../../assets/Poster1.png" class = "small-img">
      </div>
    </mat-card>
    
  `,
  styleUrls: ['../../styles.css']
})
export class GeneralHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
