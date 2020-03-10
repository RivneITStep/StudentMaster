import { Component, OnInit } from '@angular/core';
import { ShowMarksComponent } from '../showMarks/showMarks.component';
import { MatDialog } from '@angular/material/dialog';
import { MarksService } from '@core';
import { ShowMarksModel, ShowMarkModel } from '@core/models/showMarksModel';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  constructor(public dialog: MatDialog, private mS: MarksService) {}
  selectedDate = null;
  maxDate = new Date();
  minDate = new Date();
  ngOnInit() {
    this.minDate.setFullYear(this.maxDate.getFullYear() - 1, 9, 1);
  }
  onSelect(event) {
    this.selectedDate = event;
    this.openDialog(event);
  }
  // Filter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };
  openDialog(date: Date): void {
    const getDate = new Date(date).toDateString();
    // console.log('string: ' + getDate);

    this.mS.getMyMarksByDate(getDate).subscribe((x: ShowMarkModel[]) => {
      const dialogRef = this.dialog.open(ShowMarksComponent, {
        width: '60%',
        data: x,
      });

      dialogRef.afterClosed();
    });
  }
}
