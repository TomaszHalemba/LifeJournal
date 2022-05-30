import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-goal-entry',
  templateUrl: './goal-entry.component.html',
  styleUrls: ['./goal-entry.component.css']
})
export class GoalEntryComponent  {
  @Input() goalId?: number;
  public tmpnumber: any;
  public http: HttpClient;
  public Name?: string;
  public Description?: string;
  public EntryDate: FormControl;
  public RepetitionGoal?: number;
  public Hours?: number;
  public Minutes?: number;
  public Seconds?: number;
  public Time: number;


  constructor(http: HttpClient) {
    this.Time = 0;
    this.http = http;
    this.EntryDate = new FormControl(new Date());
    this.RepetitionGoal = 1;
    this.Description = "";

   

  }

  getTime(time: number) {
    this.Time = time;
  }



  addData() {
    var tmp = new GoalEntry();
    tmp.description = this.Description;
    tmp.entryDate = this.EntryDate.value;
    tmp.repetitionGoal = this.RepetitionGoal;
    tmp.time = this.Time;
    tmp.id = this.goalId;
    this.http.post<boolean>('/GoalEntryService', tmp).subscribe(data => {
    })
  }


}




export class GoalEntry {
  id?: number;
  description?: string | undefined;
  entryDate?: Date;
  repetitionGoal?: number;
  time?: number;
}

export class GoalEntryRequest {
  GoalId?: number;
  AmmountToTake?: number;
}
