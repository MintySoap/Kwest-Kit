import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-top-bar',
  template: `
  <p>
    <mat-toolbar color = 'primary'>
      <button mat-raised-button (click)='move("/KwestKit/generalHome")'>
        <div class="text-warning">Home</div>
      </button><span class="spacer"></span>

      <button mat-raised-button (click)='move("/KwestKit/aboutPage")'>
        <div class="text-warning">About</div>
      </button><span class="spacer"></span>
      
      <button mat-raised-button (click)='move("/KwestKit/login")'>
        <div class="text-warning">Login</div>
      </button>
      <span class="spacer"></span>

      <button mat-raised-button (click)='move("/KwestKit/siteDescription")'>
        <div class="text-warning">Site Description</div>
      </button>
      <span class="spacer"></span>
      
      <button mat-raised-button (click)='move("/KwestKit/checkList")'>
        <div class="text-warning">Check List</div>
      </button>
      <span class="spacer"></span>

      <button mat-raised-button (click)='redirect("https://github.com/MintySoap/Kwest-Kit.git")'>
        <div class="text-warning">GitHub</div>
      </button>
      <span class="spacer"></span>
    </mat-toolbar>
  </p>
    `,
  styles: []
})
export class TopBarComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
  }

  move(url: string){
    this.router.navigate([url])
  }

  redirect(url: string){
    window.location.href = url;
  }
}
