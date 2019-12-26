export class ScheduleModel {
  day: string;
  items: ScheduleItem[] = [];
}

export class ScheduleItem {
  name: string;
  start: string;
  end: string;
}
