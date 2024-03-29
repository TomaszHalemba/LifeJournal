import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { addDays, calculateDateDiffDays, getDateWithoutTimezone, getMonthName, getTimeFromLong, getTimeSpanFromLong, getWeekDayName } from '../Utils/TimeDateUtils';

import * as agCharts from 'ag-charts-community';
import { GoalDetails, GoalEntry, GoalEntryGetDTO, MonthStats, WeekDayStats } from '../dto/GoalsDTO';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})


export class GoalDetailsComponent {

  @Input() goalId?: number;
  @Output() editEntryEmiter = new EventEmitter<GoalEntry>();
  public http: HttpClient;
  public model?: GoalDetails;
  public data: AgChartOptions;
  public groupedData: AgChartOptions;
  public groupedDataYear: AgChartOptions;

  public startDate: FormControl;
  public endDate: FormControl;


//    enum colorOfCell {
//  white = '#000000',
//  red = '#ff3300',
//  green = '#339933'

//}

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
  public GoalEntries?: GoalEntry[];
  public weekDayStats?: WeekDayStats[];
  public monthDayStats?: MonthStats[];
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
    this.startDate = new FormControl(new Date(new Date().setDate((new Date()).getDate() - 30)));
    this.endDate = new FormControl(new Date());
    this.DateToReachRepetitionGoal = new Date();
    this.DateToReachTimeGoal = new Date();



    this.data = this.createOptions('test', initLineGraph());
    this.groupedData = this.createBarChart('test', initGraphData());
    this.groupedDataYear = this.createBarChart('test', initGraphData());


  }

  getEditEntry(entry: GoalEntry) {
    this.editEntryEmiter.emit(entry);
    };


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
            this.daysToReachTimeGoal = Math.max((this.model.timeGoal - this.model.timeGoalDone) / this.avgTimePercentage, 0);
            this.DateToReachTimeGoal = addDays(new Date(), this.daysToReachTimeGoal);
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
            this.daysToReachRepetitionGoal = Math.max((this.model.repetitionGoal - this.model.repetitionGoalDone) / this.avgGoalPercentage, 0);


            this.DateToReachRepetitionGoal = addDays(new Date(), this.daysToReachRepetitionGoal);

            this.avgGoalPercentageColor = this.avgGoalPercentage > this.avgRepetitionNeeded ? this.colorTable[2] : this.colorTable[1];

          }

          if (this.model.timeGoal && this.model.timeGoalDone) {

          }

        }

      }, error => console.error(error));

      this.http.get<GoalEntryGetDTO>('/GoalEntryService', {
        params:
        {
          GoalId: this.goalId,
          StartDate: this.startDate.value ? this.startDate.value.toISOString() : "",
          EndDate: this.endDate.value ? this.endDate.value.toISOString() : "", 
        }
      }
      )
        .subscribe(data => {
          this.GoalEntries = data.goals;
          this.weekDayStats = data.weekDaysStats;
          this.monthDayStats = data.monthsStats;

        let newData = data.goals.map((x) => {
          return { date: new Date(x.entryDate!), trainingTime: getTimeFromLong(x.time) }
        });
        this.data = this.createOptions('training time', newData, 'per day');
        if (data.weekDaysStats) {
          let newData1 = data.weekDaysStats.map((x) => {
            return { dayOfWeek: getWeekDayName(x.dayOfWeek), trainingTime: getTimeFromLong(x.timeSum) }
          });

          this.groupedData = this.createBarChart('training time', newData1,'per weekday','weekday');
        }
          if (data.monthsStats) {
            let newData2 = data.monthsStats.map((x) => {
            return { dayOfWeek: getMonthName(x.month-1), trainingTime: getTimeFromLong(x.timeSum) }
          });

          this.groupedDataYear = this.createBarChart('training time', newData2,'per month','month');
        }
      });
    }
  }

  getTimeSpanFromLong(time?: number) : string {
   return getTimeSpanFromLong(time);
  }

  getTimeFromLong(time?: number): number {
    return getTimeFromLong(time);
  }

  getWeekDayName(weekNumber: number): string {
    return getWeekDayName(weekNumber);
  }

  getMonthName(monthNumber: number): string {
    return getMonthName(monthNumber);
  }


  createBarChart(title: string, chartData: any[], chartSubtitle?: string, xAxisName?: string): AgChartOptions {
    var chartOptions: AgChartOptions;
    xAxisName = xAxisName ?? "X";
    chartOptions = {
      data: chartData,
      title: {
        text: title,
      },
      subtitle: {
        text: chartSubtitle,
      },
      series: [{
        type: 'column',
        xKey: 'dayOfWeek',
        yKey: 'trainingTime',
        label: {},
      }],
      axes: [
        {
          position: 'bottom',
          type: 'category',
          title: {
            text: xAxisName,
          },
        },
        {
          position: 'left',
          type: 'number',
          title: {
            text: 'Time [m]',
          },
        },
      ],
    };
    return chartOptions;
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
              text: 'Time [m]',
            },
          },
        ],
    };
    return chartOptions;
  }
  
}

export function initLineGraph(): any[] {
  return [
    { date: new Date(2019, 0, 7), petrol: 120.27, diesel: 130.33 },
  ];
}

export function initGraphData(): any[] {
  return  [
    {
      environment: 'uat',
      date: '2021-05-24',
      idApplication: '98682',
      quantity: 15
    }
  ];
}
