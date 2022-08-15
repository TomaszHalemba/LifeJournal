import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GoalEntry, GoalList, GoalSet } from '../dto/GoalsDTO';
import { GoalEntryComponent } from '../goal-entry/goal-entry.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {

  @ViewChild(GoalEntryComponent) mySon?: GoalEntryComponent;
  public editEntry?: GoalEntry;
  public tmpnumber: any;
  public http: HttpClient;
  public Name?: string;
  public Description?: string;
  public StartDate: FormControl;
  public EndDate: FormControl;
  public NumberOfEntries?: number;
  public RepetitionGoal?: number;
  public Time: number;
  public goalId?: number;

  public GoalListController = new FormControl();
  public GoalList?: GoalList[];

  constructor(http: HttpClient) {
    this.Time = 0;
    this.http = http;
    this.StartDate = new FormControl(new Date());
    this.EndDate = new FormControl(new Date());
    this.getData();
  }
  getTime(time: number) {
    this.Time = time;
  }


  getEditEntryData(entry: GoalEntry) {
    this.editEntry = entry;
    if (this.mySon) {
      this.mySon.setData(entry);
    }
  }

  addData() {
    var tmp = new GoalSet();
    tmp.Name = this.Name;
    tmp.Description = this.Description;
    tmp.NumberOfEntries = this.NumberOfEntries;
    tmp.StartDate = this.StartDate.value;
    tmp.EndDate = this.EndDate.value;
    tmp.RepetitionGoal = this.RepetitionGoal;
    tmp.Time = this.Time;

    this.http.post<boolean>('/GoalService', tmp).subscribe(data => {
      this.getData();
    })
  }
  GoalListChange() {
    this.goalId =  this.GoalListController.value.id;
  }


  getData() {
    this.http.get<GoalList[]>('/GoalService').subscribe(result => {
      this.GoalList = result;
    }, error => console.error(error));
  }
}
