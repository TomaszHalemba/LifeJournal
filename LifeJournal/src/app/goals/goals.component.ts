import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {

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
  /*  public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];*/
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

export class GoalSet {
  Id?: number;
  Name?: string;
  Description?: string;
  StartDate?: Date;
  EndDate?: Date;
  NumberOfEntries?: number;
  RepetitionGoal?: number;
  Time?: number;

}


export class GoalList {
  id!: number;
  name?: string;
}

