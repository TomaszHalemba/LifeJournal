import { HttpClient } from '@angular/common/http';
import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgChartOptions } from 'ag-charts-community';
import { GoalEntry } from '../dto/GoalsDTO';
import { TimeSpanPickerComponent } from '../Utils/time-span-picker/time-span-picker.component';
import { getDateWithoutTimezone } from '../Utils/TimeDateUtils';

@Component({
  selector: 'app-goal-entry',
  templateUrl: './goal-entry.component.html',
  styleUrls: ['./goal-entry.component.css']
})
export class GoalEntryComponent  {
  @ViewChild(TimeSpanPickerComponent) timePicker?: TimeSpanPickerComponent;
  @Input() goalId?: number;
  //@Input() goalEntry?: GoalEntry;
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
  public entryId?: number;


  constructor(http: HttpClient) {
    this.Time = 0;
    this.http = http;
    this.EntryDate = new FormControl(new Date());
    this.RepetitionGoal = 1;
    this.Description = "";
  }

  setData(entry: GoalEntry) {
    this.Description = entry.description;
    if (entry.entryDate) {
      this.EntryDate.setValue(new Date(entry.entryDate));
    }
    this.RepetitionGoal = entry.repetitionGoal;
    if (this.timePicker) {
      this.timePicker.setTime(entry.time);
    }
    this.entryId = entry.id;
  }


  getTime(time: number) {
    this.Time = time;
  }

  clearForm() {
    this.entryId = undefined;
    this.Description = "";
    this.RepetitionGoal = 1;
    this.EntryDate.setValue(new Date());
    if (this.timePicker) {
      this.timePicker.setTime(0);
    }

  }

  createGoalEntryFromForm(): GoalEntry {
    var formEntry = new GoalEntry();
    formEntry.description = this.Description;
    formEntry.entryDate = getDateWithoutTimezone(this.EntryDate.value);
    formEntry.repetitionGoal = this.RepetitionGoal;
    formEntry.time = this.Time;
    formEntry.goalId = this.goalId;
    return formEntry;
  }

  editData() {
    var formEntry = this.createGoalEntryFromForm();
    formEntry.id = this.entryId;
    this.http.post<boolean>('/GoalEntryService', formEntry).subscribe(data => {
    })
  }

  addData() {
    var formEntry = this.createGoalEntryFromForm();
    this.http.post<boolean>('/GoalEntryService', formEntry).subscribe(data => {
    })
  }

}
