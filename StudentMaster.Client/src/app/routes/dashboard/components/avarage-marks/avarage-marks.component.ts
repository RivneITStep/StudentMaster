import { Component, OnInit } from '@angular/core';
import { AvarageMarks } from '@core/models/average-marks';
import { MarksService } from '@core';

@Component({
  selector: 'app-avarage-marks',
  templateUrl: './avarage-marks.component.html',
  styleUrls: ['./avarage-marks.component.scss']
})
export class AvarageMarksComponent implements OnInit {
  marks: AvarageMarks[] = [];
  isFailed = false;
  isLoading = true;
  isSuccess = false;
  constructor(private marksService: MarksService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.marksService.getAverageMarks().subscribe((data: AvarageMarks[]) => {
      this.isLoading = false;
      this.isSuccess = true;
      this.marks = data;
    }, () => {
      this.isLoading = false;
      this.isFailed = true;
    });
  }

}
