import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Quest } from '../quest';
import { UserService } from '../user.service';
import { QuestService } from '../quest.service';
import { CharacterService } from '../character.service';
import { BehaviorSubject, Observable, ObservableNotification } from 'rxjs';
import { Character } from '../character';
import { User } from '../user';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TopBarComponent } from '../general-home/top-bar.component';
import { NewQuestComponent } from './new-quest.component';
import { CookieService } from 'ngx-cookie-service';
import { IndividualQuest } from '../individual-quest';
import { CountdownModule, CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';


//note: so the basic idea here is that we're gonna have a table that will hold all of the quests and each row will have a button to start the quest and at the end it'll award the exp
//note: the character info will be on the side as well as an option for the user to add quests

//todo: timer functionality
//todo: make sure that the quest creation works for someone who don't got a quest.

@Component({
  selector: 'app-quest-board',
  template: `
    <div id="bg"></div>
    <app-top-bar></app-top-bar>
    <mat-card>
      <div class="wrapper">
        <img mat-card-image src="../../assets/NoticeBoard.jpg" class="big-img">

        <table class="table table-striped table-border small-img" id="questsTable">
          <thead class="text-warning text-wrap">
              <tr>
                  <th>Quest</th>
                  <th>Time</th>
              </tr>
          </thead>
          <tbody class="text-warning text-wrap">
              <!--tr *ngFor="let quest of quests$ | async"-->
              <tr *ngFor="let quest of questList; let i = index">
                  <td class="text-warning text-wrap">{{quest.quest}}</td>
                  <td class="text-warning text-wrap">
                    <countdown #cd [config]="{ leftTime: minutes(quest.time!), demand: true }" (event)="watchClock($event, quest.time!, i)"></countdown>
                    <div>
                      <div style="padding: 3px"><button mat-raised-button (click)="cd.begin()" class="text-warning">start</button></div>
                      <button mat-raised-button (click)="deleteQuest(i)" class="text-warning">abandon</button>
                    </div>
                  </td>
              </tr>
          </tbody>
        </table>

        <app-new-quest (formSubmitted)="addQuest($event)"></app-new-quest>
      </div>
    </mat-card>
    <mat-card style="position: fixed; top: 30%; left: 0%;" class="text-warning">
      <mat-card-header><mat-card-title style="font-size: 25px;">Character Stats</mat-card-title></mat-card-header>
        <mat-card-content>
          <p style="font-size: 20px;">
          level: {{this.characterStats[0]}}<br>
          experience: {{this.characterStats[1]}} / {{this.levelCap}}<br>
          strength: {{this.characterStats[2]}}<br>
          dexterity: {{this.characterStats[3]}}<br>
          intelligence: {{this.characterStats[4]}}<br>
          wisdom: {{this.characterStats[5]}}<br>
          charisma: {{this.characterStats[6]}}<br>
          endurance: {{this.characterStats[7]}}<br>
          </p>
        </mat-card-content>
    </mat-card>
  `,
  styles: [],
  styleUrls: ['../../styles.css'],
})

export class QuestBoardComponent implements OnInit{
  quests$: Observable<Quest> = new Observable();
  character$: Observable<Character> = new Observable();
  private cookie_id='';
  questList = [] as Array<IndividualQuest>;
  characterStats = [] as Array<number>;  
  levelCap = 0;

  constructor(private router: Router, private questService: QuestService, private fb: FormBuilder,
    private userService: UserService, private characterService: CharacterService, private cookieService: CookieService) { }
    
  ngOnInit(): void{
    this.cookie_id = this.cookieService.get('userID');
    this.fetchQuests();
    this.getCharacterInfo();
  }

  addQuest(quest:IndividualQuest): void{
    this.cookie_id = this.cookieService.get('userID');
    console.log(quest);
    this.questList.push(quest)
    this.questService.getQuestUserID(this.cookie_id).subscribe({ //this should give us an observable of the Quest object associated with the user_id
      //This will look through and see user has a quest associated.
      next: (val: Quest) =>{ //val is our Quest object we got from the above line
        console.log(val);
        console.log('update');
        console.log(this.questList);
        this.questService.updateQuest(val._id!, this.questList).subscribe({
          next: (val: string) =>{
            console.log(val);
          }
        });
      },
      error: (err: Error) => {
        console.log('create');
        var newQuestObject: Quest = {
          list: [quest],
          user_id: this.cookie_id
        }
        this.questService.createQuest(newQuestObject).subscribe({
          next: (val: string) =>{
            console.log(val);
          }
        })
        this.fetchQuests();
      },
    });
  }

  //todo: so i'm not deleting the whole quest. I'm simply deleting one of the quests in the list so it's gonna be very similar to the addQuest function
  deleteQuest(rowIndex: number): void{
    this.cookie_id = this.cookieService.get('userID');

    var temp_questList = [] as Array<IndividualQuest>
    for(var i = 0; i < this.questList.length; i++){
      if(i != rowIndex){
        temp_questList.push(this.questList[i])
      }
    }
    this.questList = temp_questList;

    this.questService.getQuestUserID(this.cookie_id).subscribe({ //this should give us an observable of the Quest object associated with the user_id
      //This will look through and see user has a quest associated.
      next: (val: Quest) =>{ //val is our Quest object we got from the above line
        this.questService.updateQuest(val._id!, this.questList).subscribe({
          next: (val: string) =>{
            console.log(val);
          }
        });
      },
      error: (err: Error) => {
        console.log('sucks to suck. deleting error');
      },
    });
  }

  private fetchQuests(): void{
    this.quests$ = this.questService.getQuestUserID(this.cookie_id);
    this.getQuestList();
  }

  getQuestList(){
    this.quests$.subscribe({
      next: (val: Quest) => {
        this.questList = val.list!;
        console.log(this.questList);
      },
      error: (err: Error) => {
        console.log(err);
        console.log('no quest exists');
      }
    })
  }

  public minutes(seconds: number){
    return seconds*60;
  }

  getCharacterInfo(){
    this.character$ = this.characterService.getCharacterUserID(this.cookie_id);
    this.character$.subscribe({
      next: (val: Character) => {
        this.characterStats = [] as Array<number>
        this.characterStats.push(val.level!); //0
        this.characterStats.push(val.experience!); //1
        this.characterStats.push(val.strength!); //2
        this.characterStats.push(val.agility!); //3
        this.characterStats.push(val.intelligence!); //4
        this.characterStats.push(val.wisdom!); //5
        this.characterStats.push(val.charisma!); //6
        this.characterStats.push(val.endurance!); //7
        this.levelCap = this.characterStats[0]*500;
      },
      error: (err: Error) => {
        console.log(err);
        console.log('could not get stats')
      }
    })
  }

  //observes the clock and watches for when it ends
  watchClock(event: CountdownEvent, time: number, rowIndex: number){
    if(event.status == 3){ //3 means done
      this.questEnd(time, rowIndex);
    } 
  }

  //when the quest ends, give the player their exp
  questEnd(time: number, rowIndex: number){
    //get the quest time and multiply that by 10 and add that to exp
    this.characterStats[1] += 10*time;
    if(this.characterStats[1] >= this.characterStats[0]*500){ //if exp > exp cap then call levelup()
      this.levelUp(this.characterStats[1]-(this.characterStats[0]*500));
    }
    else{
      this.character$.subscribe({
        next: (val: Character) => {
          console.log("questEnd logs:")
          console.log(val._id!);
          console.log("exp:" + this.characterStats[1]);
          this.characterService.updateCharacter(val._id!, 'experience', this.characterStats[1]).subscribe({
            next: (val: string) =>{
              console.log(val);
            }
          });
        }
      })
    }

    this.deleteQuest(rowIndex);
  }

  //this will modify the character's stats when they level up
  modifyCharacter(){
    this.character$.subscribe({
      next: (val: Character) => {

      }
    })
  }


  levelUp(leftoverExp: number){
    this.characterStats[0] += 1;
    this.levelCap = this.characterStats[0] * 500;
    this.characterStats[1] = leftoverExp;
    this.character$.subscribe({
      next: (val: Character) => {
        this.characterService.updateCharacter(val._id!, 'level', this.characterStats[0]);
        this.characterService.updateCharacter(val._id!, 'experience', this.characterStats[1]);
      }
    })
  }
}