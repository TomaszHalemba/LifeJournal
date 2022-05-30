import { Component, NgModule, OnInit } from '@angular/core';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  startDate = new Date(2000, 0, 2);
  calendar: any;
  ngOnInit(): void {
  }
}
