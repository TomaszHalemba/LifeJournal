import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder-entry-list',
  templateUrl: './reminder-entry-list.component.html',
  styleUrls: ['./reminder-entry-list.component.css']
})
export class ReminderEntryListComponent implements OnInit {


  public http: HttpClient;
  public entryList?: reminderEntry[];
  public entryDate: FormControl;
  public reminderName?: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.entryDate = new FormControl(new Date());
    this.getData();
  }

  ngOnInit(): void {
  }


  getData() {
    this.http.get<reminderEntry[]>('/ReminderEntryGetService').subscribe(result => {
      this.entryList = result;
      });
  }
  addData() {
    var tmp = new reminderEntry();
    tmp.name = this.reminderName;
    tmp.reminderDate = this.entryDate.value;


    this.http.post<boolean>('/ReminderEntryGetService', tmp).subscribe(result => {
      this.getData();
    });
  }

  changeStatus(entryId: number) {
    this.http.put<boolean>('/ReminderEntryGetService/', entryId).subscribe(result => {
      this.getData();
    });
    
  }


}

export class reminderEntry {
  id!: number;
  name?: string | undefined;
  reminderDate?: Date;
  dateOfEntry?: Date;
  isDone?: boolean;
}
