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

}
