import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterLink } from '@angular/router';
import { UsersListComponent } from './admin-components/users-list.component';
import { UserFormComponent } from './admin-components/user-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './admin-components/add-user.component';
import { EditUserComponent } from './admin-components/edit-user.component';
import { LoginComponent } from './user-login/login.component';
import { LoginFormComponent } from './user-login/login-form.component';
import { GeneralHomeComponent } from './general-home/general-home.component';
import { TopBarComponent } from './general-home/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import '@angular/material';
import { AboutPageComponent } from './about-page/about-page.component';
import { SiteDescriptionComponent } from './site-description/site-description.component';
import { CheckListComponent } from './check-list/check-list.component'
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DOCUMENT } from '@angular/common';
import { QuestBoardComponent } from './quest-board/quest-board.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NewQuestComponent } from './quest-board/new-quest.component';
import { CookieService } from 'ngx-cookie-service';
import { TestComponent } from './test/test.component';
import { CountdownGlobalConfig, CountdownModule, CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    LoginComponent,
    LoginFormComponent,
    GeneralHomeComponent,
    TopBarComponent,
    AboutPageComponent,
    SiteDescriptionComponent,
    CheckListComponent,
    QuestBoardComponent,
    NewQuestComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CountdownModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
