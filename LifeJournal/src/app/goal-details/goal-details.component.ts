import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { GoalEntry } from '../goal-entry/goal-entry.component';
import { calculateDateDiffDays, getTimeFromLong, getTimeSpanFromLong } from '../Utils/TimeDateUtils';

import * as agCharts from 'ag-charts-community';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})


export class GoalDetailsComponent {

  @Input() goalId?: number;
  public http: HttpClient;
  public model?: GoalDetails;
  public options: AgChartOptions;


//    enum colorOfCell {
//  white = '#000000',
//  red = '#ff3300',
//  green = '#339933'

//}



//  < th > goal % </th>
//  < th > avg < /th>
//  < th > avg needed < /th>
//    < th >% needed to be done < br /> to current date < /th>
//      < th ># needed to be done < br /> to current date < /th>
//        < th > days to 100 % </th>
//          < /tr>
//          < tr >
//          <td>Repetitions < /td>
//                < td[ngStyle]="{'background-color': this.repetitionPercentageColor}" > {{ this.avgRepetitionsDone | number }}</td>
//                  < td > {{ this.avgRepetitionNeeded | number }}</td>
//                    < td rowspan = "2" > {{ this?.goalPercentageToDate | number }}% </td>

//                      < td > {{ this.repetitionGoalToDate | number : '1.0-0' }}</td>
//                        < td > {{ this.daysToReachRepetitionGoal | number : '1.0-0' }} ({{ this.DateToReachRepetitionGoal | date: 'dd-MM-yyyy' }})</td>

//                          < /tr>
//                          < tr >
//                          <td>Time < /td>
//                                < td[ngStyle]="{'background-color': this.avgTimeColor}" > {{ this.getTimeSpanFromLong(this?.avgTime) }}</td>
//                                  < td > {{ this.getTimeSpanFromLong(this?.avgTimeNeeded) }}</td>
//                                    < td > {{ this.getTimeSpanFromLong(this?.timeGoalToDate) }}</td>
//                                      < td > {{ this.daysToReachTimeGoal | number : '1.0-0' }} ({{ this.DateToReachTimeGoal | date: 'dd-MM-yyyy' }})</td>
//                                        < /tr>
  public colorTable: string[];

  public goalPercentage?: number;
  public timePercentage?: number;
  public timePercentageColor: string;
  public goalPercentageColor: string;

  public avgGoalPercentage?: number;
  public avgTimePercentage?: number
  public avgGoalPercentageColor: string;
  public avgTimePercentageColor: string;


  public avgTimeNeeded?: number;
  public avgRepetitionNeeded?: number;


  public daySpan?: number;
  public goalPercentageToDate?: number;
  public color?: string;
  public PastDays?: number;
  public GoalEntries?: GoalEntry[];
  public timeGoalToDate?: number;
  public repetitionGoalToDate?: number;

  public daysToReachRepetitionGoal?: number;
  public daysToReachTimeGoal?: number;
  public DateToReachRepetitionGoal: Date;
  public DateToReachTimeGoal: Date;

  constructor(http: HttpClient) {
    this.colorTable = ['#ffffff', '#ffb3b3', '#b3e6b3'];
    this.goalPercentageColor = this.colorTable[0];
    this.timePercentageColor = this.colorTable[0];
    this.avgTimePercentageColor = this.colorTable[0];
    this.avgGoalPercentageColor = this.colorTable[0];
    this.http = http;
    this.getData();
    this.PastDays = 30;
    this.DateToReachRepetitionGoal = new Date();
    this.DateToReachTimeGoal = new Date();


    this.options = this.createOptions('test', getData1());
  }


  getData() {
    if (this.goalId) {
      this.http.get<GoalDetails>('/GoalDetailsService', { params: { id: this.goalId! } }).subscribe(result => {
        this.model = result;
        if (this.model.repetitionGoal && this.model.repetitionGoalDone) {
          this.goalPercentage = this.model.repetitionGoalDone / this.model.repetitionGoal * 100
        }
        if (this.model.repetitionGoalDone && this.model.timeGoalDone) {
          this.avgTimePercentage = this.model.timeGoalDone / this.model.repetitionGoalDone;
        }
        if (this.model.timeGoalDone && this.model.timeGoal) {
          this.timePercentage = (this.model.timeGoalDone / this.model.timeGoal * 100);
          if (this.avgTimePercentage) {
            this.daysToReachTimeGoal = (this.model.timeGoal - this.model.timeGoalDone) / this.avgTimePercentage;
            this.DateToReachTimeGoal.setDate(this.DateToReachTimeGoal.getDate() + this.daysToReachTimeGoal);
          }
        }

        if (this.model.repetitionGoal && this.model.timeGoal) {
          this.avgTimeNeeded = this.model.timeGoal / this.model.repetitionGoal;
        }
        if (this.avgTimePercentage && this.avgTimeNeeded) {
          this.avgTimePercentageColor = this.avgTimePercentage > this.avgTimeNeeded ? this.colorTable[2] : this.colorTable[1];
        }


        if (this.model.startDate && this.model.endDate) {
          this.daySpan = calculateDateDiffDays(new Date(this.model.endDate), new Date(this.model.startDate));



          if (this.model.repetitionGoal && this.model.repetitionGoalDone) {
            var daysFromStartToCurrentDate = calculateDateDiffDays(new Date(this.model.startDate), new Date());

            this.goalPercentageToDate = daysFromStartToCurrentDate / this.daySpan * 100;
            this.avgRepetitionNeeded = this.model.repetitionGoal / this.daySpan;
            this.avgGoalPercentage = this.model.repetitionGoalDone / daysFromStartToCurrentDate;

            if (this.model.timeGoal) {
              this.timeGoalToDate = this.goalPercentageToDate / 100 * this.model.timeGoal;
            }
            if (this.model.repetitionGoal) {
              this.repetitionGoalToDate = this.goalPercentageToDate / 100 * this.model.repetitionGoal;
            }

            if (this.goalPercentage) {
              this.goalPercentageColor = this.goalPercentage > this.goalPercentageToDate ? this.colorTable[2] : this.colorTable[1];
            }
            if (this.timePercentage) {
              this.timePercentageColor = this.timePercentage > this.goalPercentageToDate ? this.colorTable[2] : this.colorTable[1];
            }
            this.daysToReachRepetitionGoal = (this.model.repetitionGoal - this.model.repetitionGoalDone) / this.avgGoalPercentage;

            this.DateToReachRepetitionGoal.setDate(this.DateToReachRepetitionGoal.getDate() + this.daysToReachRepetitionGoal);

            this.avgGoalPercentageColor = this.avgGoalPercentage > this.avgRepetitionNeeded ? this.colorTable[2] : this.colorTable[1];
            
          }

          if (this.model.timeGoal && this.model.timeGoalDone) {

          }

        }

      }, error => console.error(error));

      this.http.get<GoalEntry[]>('/GoalEntryService', { params: { GoalId: this.goalId!, AmmountToTake: this.PastDays ? this.PastDays : 30 } }).subscribe(data => {
        this.GoalEntries = data;

        let newData = data.map((x) => {
          return { date: new Date(x.entryDate!), trainingTime: getTimeFromLong(x.time) }
        });

        this.options = this.createOptions('training time per day', newData);
      });
    }
  }

  getTimeSpanFromLong(time?: number) : string {
   return getTimeSpanFromLong(time);
  }

  getTimeFromLong(time?: number): number {
    return getTimeFromLong(time);
  }


  createOptions(title: string, chartData: any[], chartSubtitle? : string): AgChartOptions {
    var chartOptions: AgChartOptions;
    chartOptions = 
    {
      autoSize: true,
        data: chartData,
        theme: {
        overrides: {
          line: {
            series: {
              highlightStyle: {
                series: {
                  strokeWidth: 3,
                    dimOpacity: 0.2,
                },
              },
            },
          },
        },
      },
      title: {
        text: title,
          fontSize: 18,
      },
      subtitle: {
        text: chartSubtitle,
      },
      series: [
        {
          type: 'line',
          xKey: 'date',
          yKey: 'trainingTime',
          stroke: '#01c185',
          marker: {
            stroke: '#01c185',
            fill: '#01c185',
          },
        },
      ],
        axes: [
          {
            position: 'bottom',
            type: 'time',
            tick: {
              count: agCharts.time.day.every(7),
            },
            title: {
              text: 'Date',
            },
          },
          {
            position: 'left',
            type: 'number',
            title: {
              text: 'Time',
            },
          },
        ],
    };
    return chartOptions;
  }
  


}
export class GoalDetails {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  repetitionGoal?: number;
  repetitionGoalDone?: number;
  timeGoal?: number;
  timeGoalDone?: number;

}
export function getData1(): any[] {
  return [
    { date: new Date(2019, 0, 7), petrol: 120.27, diesel: 130.33 },
    { date: new Date(2019, 0, 14), petrol: 119.53, diesel: 129.47 },
    { date: new Date(2019, 0, 21), petrol: 119.12, diesel: 128.92 },
    { date: new Date(2019, 0, 28), petrol: 119.29, diesel: 129.1 },
    { date: new Date(2019, 1, 4), petrol: 119.13, diesel: 129.13 },
    { date: new Date(2019, 1, 11), petrol: 118.97, diesel: 129.17 },
    { date: new Date(2019, 1, 18), petrol: 119.05, diesel: 129.23 },
    { date: new Date(2019, 1, 25), petrol: 119.22, diesel: 129.66 },
    { date: new Date(2019, 2, 4), petrol: 119.72, diesel: 130.25 },
    { date: new Date(2019, 2, 11), petrol: 120.1, diesel: 130.59 },
    { date: new Date(2019, 2, 18), petrol: 120.48, diesel: 130.85 },
    { date: new Date(2019, 2, 25), petrol: 120.83, diesel: 131.15 },
    { date: new Date(2019, 3, 1), petrol: 121.7, diesel: 131.48 },
    { date: new Date(2019, 3, 8), petrol: 122.75, diesel: 132.08 },
    { date: new Date(2019, 3, 15), petrol: 124.06, diesel: 132.96 },
    { date: new Date(2019, 3, 22), petrol: 125.43, diesel: 133.99 },
    { date: new Date(2019, 3, 29), petrol: 126.36, diesel: 134.6 },
    { date: new Date(2019, 4, 6), petrol: 127.5, diesel: 135.41 },
    { date: new Date(2019, 4, 13), petrol: 127.97, diesel: 135.36 },
    { date: new Date(2019, 4, 20), petrol: 128.51, diesel: 135.82 },
    { date: new Date(2019, 4, 27), petrol: 129.14, diesel: 136.45 },
    { date: new Date(2019, 5, 3), petrol: 129.41, diesel: 136.39 },
    { date: new Date(2019, 5, 10), petrol: 128.89, diesel: 135.4 },
    { date: new Date(2019, 5, 17), petrol: 127.66, diesel: 133.76 },
    { date: new Date(2019, 5, 24), petrol: 126.66, diesel: 131.81 },
    { date: new Date(2019, 6, 1), petrol: 126.49, diesel: 131.55 },
    { date: new Date(2019, 6, 8), petrol: 126.86, diesel: 131.68 },
    { date: new Date(2019, 6, 15), petrol: 127.13, diesel: 131.86 },
    { date: new Date(2019, 6, 22), petrol: 127.81, diesel: 132.21 },
    { date: new Date(2019, 6, 29), petrol: 128.03, diesel: 132.6 },
    { date: new Date(2019, 7, 5), petrol: 128.37, diesel: 132.61 },
    { date: new Date(2019, 7, 12), petrol: 128.36, diesel: 132.59 },
    { date: new Date(2019, 7, 19), petrol: 128.17, diesel: 132.6 },
    { date: new Date(2019, 7, 26), petrol: 128.22, diesel: 132.51 },
    { date: new Date(2019, 8, 2), petrol: 127.86, diesel: 132.29 },
    { date: new Date(2019, 8, 9), petrol: 127.79, diesel: 131.89 },
    { date: new Date(2019, 8, 16), petrol: 126.92, diesel: 131.35 },
    { date: new Date(2019, 8, 23), petrol: 126.78, diesel: 131.52 },
    { date: new Date(2019, 8, 30), petrol: 126.92, diesel: 131.83 },
    { date: new Date(2019, 9, 7), petrol: 126.87, diesel: 131.82 },
    { date: new Date(2019, 9, 14), petrol: 126.91, diesel: 131.89 },
    { date: new Date(2019, 9, 21), petrol: 126.4, diesel: 131.28 },
    { date: new Date(2019, 9, 28), petrol: 125.77, diesel: 130.6 },
    { date: new Date(2019, 10, 4), petrol: 125.56, diesel: 130.38 },
    { date: new Date(2019, 10, 11), petrol: 125.59, diesel: 130.42 },
    { date: new Date(2019, 10, 18), petrol: 125.58, diesel: 130.35 },
    { date: new Date(2019, 10, 25), petrol: 125.32, diesel: 130.08 },
    { date: new Date(2019, 11, 2), petrol: 124.81, diesel: 129.79 },
    { date: new Date(2019, 11, 9), petrol: 124.75, diesel: 129.79 },
    { date: new Date(2019, 11, 16), petrol: 124.33, diesel: 129.56 },
    { date: new Date(2019, 11, 23), petrol: 124.16, diesel: 129.81 },
    { date: new Date(2019, 11, 30), petrol: 124.96, diesel: 130.54 },
  ];
}
