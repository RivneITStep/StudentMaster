export class ShowMarksModel {
  date: string;
  marks: ShowMarkModel[];
}

export class ShowMarkModel {
  value: number;
  name: string;
  type: string;
}
