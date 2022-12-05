import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { UsersListComponent } from './admin-components/users-list.component';
import { AddUserComponent } from './admin-components/add-user.component'; 
import { EditUserComponent } from './admin-components/edit-user.component';
import { LoginComponent } from './user-login/login.component';
import { GeneralHomeComponent } from './general-home/general-home.component';
import { TopBarComponent } from './general-home/top-bar.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { SiteDescriptionComponent } from './site-description/site-description.component';
import { CheckListComponent } from './check-list/check-list.component';
import { QuestBoardComponent } from './quest-board/quest-board.component';



const routes: Routes = [
  { path: '', redirectTo: 'KwestKit/generalHome', pathMatch: 'full' },
  { path: 'KwestKit/login', component: LoginComponent},
  { path: 'KwestKit/generalHome', component: GeneralHomeComponent},
  { path: 'KwestKit/aboutPage', component: AboutPageComponent},
  { path: 'KwestKit/siteDescription', component: SiteDescriptionComponent},
  { path: 'KwestKit/checkList', component: CheckListComponent},
  { path: 'KwestKit/questBoard', component: QuestBoardComponent},

  //admin stuff
  { path: 'KwestKit/admin', component: UsersListComponent },
  { path: 'KwestKit/admin/new', component: AddUserComponent },
  { path: 'KwestKit/admin/edit/:id', component: EditUserComponent },
  //{ path: 'KwestKit/register'}, //todo: make the paths for register and all that
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }