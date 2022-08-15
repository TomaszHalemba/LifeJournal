import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-span-picker',
  templateUrl: './time-span-picker.component.html',
  styleUrls: ['./time-span-picker.component.css']
})
export class TimeSpanPickerComponent  {
  @Input() FieldName?: string;
  @Output() Time =  new EventEmitter<number>()
  public Hours: number;
  public Minutes: number;
  public Seconds: number;


  constructor() {
    this.Hours = 0;
    this.Minutes = 0;
    this.Seconds = 0;
  }
  updateTime() {
    var time = this.Hours * 3600 + this.Minutes * 60 + this.Seconds;
    this.Time.emit(time);
  }


  setTime(time?: number) {
    if (time) {
      var seconds = time % 60;
      var tmp = (time - seconds) / 60;
      var minutes = tmp % 60;
      var hours = (tmp - minutes) / 60;

      this.Seconds = seconds;
      this.Minutes = minutes;
      this.Hours = hours;
    }
    else {
      this.Seconds = 0;
      this.Minutes = 0;
      this.Hours = 0;
    }


  }

}
