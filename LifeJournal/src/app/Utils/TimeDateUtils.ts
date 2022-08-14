

export function calcDateTimeDiff(date1: Date, Date2: Date): number {
  return Math.floor((Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) - Date.UTC(Date2.getFullYear(), Date2.getMonth(), Date2.getDate())) / (1000));
}

export function getTimeSpanFromLong(time?: number): string {

  if (!time) return "";
  var returnString = "";
  var seconds = time % 60;
  var tmp = (time - seconds) / 60;
  var minutes = tmp % 60;
  var hours = (tmp - minutes) / 60;
  returnString = hours.toString().padStart(2, '0') + ":" + minutes.toFixed(0).toString().padStart(2, '0') + ":" + seconds.toFixed(0).toString().padStart(2, '0')
  return returnString;
}

export function getTimeFromLong(time?: number): number {

  if (!time) return 0;
  var returnString = 0;
  var seconds = time % 60;
  var tmp = (time - seconds) / 60;
  var minutes = tmp;
  returnString = minutes + seconds/60;
  return returnString;
}

export function getDateWithoutTimezone(date: Date): Date {

  var userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
}


export function getWeekDayName(day: number) :string{
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return weekdays[day];
}

export function calculateDateDiffDays(date1: Date, date2: Date) {
  return Math.abs(Math.floor((Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) - Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())) / (1000 * 60 * 60 * 24))) + 1;
}
