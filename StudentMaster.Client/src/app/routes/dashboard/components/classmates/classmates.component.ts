import { Component, OnInit, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { StudentModel } from '@core/models/student-model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { selectAccountIsSuccess, selectAccountIsLoading, selectAccountIsFailed } from '@core/redux/selectors/account.selectors';
import { selectStudentClassClassmates } from '@core/redux/selectors/student-class.selectors';

@Component({
  selector: 'app-classmates',
  templateUrl: './classmates.component.html',
  styleUrls: ['./classmates.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClassmatesComponent implements OnInit {

  students: StudentModel[] = [];
  isFailed = false;
  isLoading = true;
  isSuccess = false;
  constructor(private store: Store<IAppState>, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.select('studentclass').subscribe((data) => {
      this.isFailed = data.failed;
      this.isLoading = data.isLoading;
      this.isSuccess = data.success;
      this.students = data.classmates;
    });
    // this.store.pipe(select(selectAccountIsLoading)).subscribe(isLoading => {this.isLoading = isLoading; });
    // this.store.pipe(select(selectAccountIsFailed)).subscribe(isFailed => {this.isFailed = isFailed; });
    // this.store.pipe(select(selectAccountIsSuccess)).subscribe((isSuccess) => {
    //   console.log(isSuccess);
    //   this.isSuccess = isSuccess;
    //   if (isSuccess) {

    //     this.store.pipe(select(selectStudentClassClassmates)).subscribe((classmates: StudentModel[]) => {
    //       this.students = classmates;
    //       console.log(classmates);
    //     });
    //   }
    // });

  }


}
