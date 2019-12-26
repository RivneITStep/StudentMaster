import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassesService } from '@core/services/classes.service';
import { SubjectModel } from '@core/models/subject-model';
import { NOTIFY_OPTIONS } from '@core/config';
import { ToolsService } from '@core/services/tools.service';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.component.html',
  styleUrls: ['./add-mark.component.css'],
})
export class AddMarkComponent implements OnInit {
  isLinear = true;
  subjectForm: FormGroup;
  markForm: FormGroup;
  error = '';
  done = '';
  maxDate = new Date();
  minDate = new Date();
  isLoading = false;
  public subjects: SubjectModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tools: ToolsService,
    public dialogRef: MatDialogRef<AddMarkComponent>,
    private cS: ClassesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.minDate.setDate(this.maxDate.getDate() - 7);
    this.subjectForm = this.formBuilder.group({
      subject: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
    this.markForm = this.formBuilder.group({
      mark: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.isLoading = true;
    this.cS.getTeacherClassSubjects(this.data.classId).subscribe(
      x => {
        this.isLoading = false;
        if (x) {
          this.subjects = x;
        } else {
          this.dialogRef.close();
          this.tools.showNotification('You haven`t subjects in this class');
        }
      },
      _ => {
        this.isLoading = false;
      }
    );
  }
  // Filter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };
  close() {
    this.dialogRef.close();
  }
  onSubmitMarkForm(stepper: MatStepper) {
    const subjectFormData = this.subjectForm.value;
    const markFormData = this.markForm.value;
    this.isLoading = true;
    this.cS
      .addMarkForStudentAsync(
        this.data.id,
        markFormData.type,
        subjectFormData.subject,
        markFormData.mark,
        new Date(subjectFormData.date).toDateString()
      )
      .subscribe(
        () => {
          stepper.reset();
          this.dialogRef.close();
          this.tools.showNotification('Mark added');
          this.isLoading = false;
        },
        _ => {
          this.isLoading = false;
        }
      );
  }
  onSubmitSubjectForm(stepper: MatStepper) {
    this.isLoading = true;
    const formData = this.subjectForm.value;
    this.cS
      .getStudentMarkByDateAndSubject(
        formData.subject,
        this.data.id,
        new Date(formData.date).toDateString()
      )
      .subscribe(
        x => {
          this.isLoading = false;
          if (x[0]) {
            this.markForm.controls.mark.setValue(x[0]);
          }

          stepper.next();
        },
        _ => {
          this.isLoading = false;
        }
      );
  }
}
