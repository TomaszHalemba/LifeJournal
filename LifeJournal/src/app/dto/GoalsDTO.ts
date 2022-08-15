export class GoalEntryGetDTO {
  goals!: GoalEntry[];
  weekDaysStats?: WeekDayStats[];
}


export class GoalEntry {
  id?: number;
  goalId?: number;
  description?: string | undefined;
  entryDate?: Date;
  repetitionGoal?: number;
  time?: number;
}

export class WeekDayStats {
  dayOfWeek!: number;
  timeSum?: number;
  entries?: number;
  avgTime?: number;
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


export class GoalEntryRequest {
  GoalId?: number;
  AmmountToTake?: number;
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

