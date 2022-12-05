import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Quest } from '../quest';
import { User } from '../user';
import { Character } from '../character';
import { CookieService } from 'ngx-cookie-service';
import { IndividualQuest } from '../individual-quest';
import { NgModel } from '@angular/forms';


//problem: I think there's a problem here? not sure what though...
@Component({
  selector: 'app-new-quest',
  template: `
    <form class="user-form" autocomplete="off" [formGroup]="questForm" (ngSubmit)="submitForm()">
      
      <mat-form-field appearance="fill">
        <mat-label>Input New Quest</mat-label>
        <textarea matInput name="quest" id="quest" formControlName="quest"></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Time in Minutes</mat-label>
        <input matInput name="time" id="time" formControlName="time">
      </mat-form-field>

      <br>
      <button mat-raised-button type="submit" [disabled]="questForm.invalid" class="text-warning">Add Quest</button>
    </form>
  `,
  styles: ['mat-form-field {padding: 10px;}'],
  styleUrls: ['../../styles.css']
})

//problem: I can't seem to figure out how the hell to get the values from the form
export class NewQuestComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<IndividualQuest> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<IndividualQuest>();

  @Output()
  formSubmitted = new EventEmitter<IndividualQuest>();

  questForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private cookieService: CookieService) {
    //this should instantiate the new form
    this.questForm=this.fb.group({
      quest: '',
      time: 0
    })
  }

  get quest() { return this.questForm.get('quest')};
  get time() { return this.questForm.get('time')};

  ngOnInit(){
    this.questForm = this.fb.group({
      quest: this.quest,
      time: this.time
    })
    this.questForm.valueChanges.subscribe((val) => {this.formValuesChanged.emit(val)})
  }

  

  submitForm(){
    this.formSubmitted.emit(this.questForm.value);
  }
}
