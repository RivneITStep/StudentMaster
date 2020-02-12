import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectModel } from '@core/models/subject-model';
import { ClassesService } from '@core/services/classes.service';
import { NOTIFY_OPTIONS } from '@core/config';
import { ToolsService } from '@core/services/tools.service';
import { HomeworksService } from '@core/services/homeworks.service';
import { AddHomeWorkModel } from '@core/models/add-homework';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { GetSubject } from '@core/redux/actions/teacher.actions';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css'],
})
export class AddHomeworkComponent implements OnInit {
  isLinear = true;
  isLoading = false;
  infoForm: FormGroup;
  dataForm: FormGroup;
  error = '';
  done = '';
  maxDate = new Date();
  minDate = new Date();

  public subjects: SubjectModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddHomeworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tools: ToolsService,
    private hS: HomeworksService,
    private tS: ToolsService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.maxDate.setDate(this.minDate.getDate() + 7);
    this.infoForm = this.fb.group({
      theme: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subject: ['', [Validators.required]],
    });
    this.dataForm = this.fb.group({
      homework: ['', [Validators.required]],
    });

    this.store.select('teacher').subscribe(data => {
      console.log(data);
      this.subjects = data.subjects;
    });
    // this.cS.getTeacherClassSubjcets(this.data.classId).subscribe(x => {
    //   if (x) {
    //     this.subjects = x;
    //   } else {
    //     this.dialogRef.close();
    //     this.notifications.error('Oops', 'You haven`t subjects in this class', NOTIFY_OPTIONS);
    //   }
    // });
  }
  onSubmitInfoForm(stepper: MatStepper) {
    // console.log('not implemented');
    stepper.next();
  }
  onSubmitDataForm(stepper: MatStepper) {
    const dataInfoForm = this.infoForm.value;
    const dataDataForm = this.dataForm.value;
    console.log(dataDataForm);
    const data = new AddHomeWorkModel();
    this.isLoading = true;
    data.classId = this.data.classId;
    (data.file = dataDataForm.homework as File),
      (data.subjectId = dataInfoForm.subject),
      (data.theme = dataInfoForm.theme),
      (data.toTime = dataInfoForm.date);

    console.log('data: ', data);

    const formdata = new FormData();
    let selectedClass = -1;
    this.store.select('teacher').subscribe(x => {
      selectedClass = x.selectedClass;
    });
    formdata.append('classId', selectedClass.toString());
    formdata.append('Theme', data.theme);
    formdata.append('subjectId', data.subjectId);
    formdata.append('file', data.file);
    formdata.append('toTime', new Date(data.toTime).toDateString());

    this.hS.AddHomeWorkAsync(formdata).subscribe(
      _ => {
        this.isLoading = false;
        this.tools.showNotification('Homework added');
        stepper.reset();
        this.dialogRef.close();
      },
      _ => {
        this.isLoading = false;
        this.dialogRef.close();
      }
    );
  }
  onPickImage() {
    const selector = document.getElementById('fileSelector') as HTMLInputElement;
    selector.click();
    selector.onchange = (event: any) => {
      console.log(event.target.files[0].type);
      if (
        !event.target.files[0].type.indexOf('image') ||
        !event.target.files[0].type.indexOf('text/plain')
      ) {
        this.dataForm.controls.homework.setValue(event.target.files[0]);
      } else {
        this.tools.showNotification('Please select valid file');
        this.dialogRef.close();
      }
    };
  }
  close() {
    this.dialogRef.close();
  }
}
