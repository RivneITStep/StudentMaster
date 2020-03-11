import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubjectModel } from '@core/models/subject-model';
import { ToolsService } from '@core/services/tools.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InviteUserComponent } from '../invite-user/invite-user.component';
import { AdminService } from '@core/services/admin.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-edit-subjects-in-teacher',
  templateUrl: './edit-subjects-in-teacher.component.html',
  styleUrls: ['./edit-subjects-in-teacher.component.scss']
})
export class EditSubjectsInTeacherComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;

  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  subjects: SubjectModel[] = [];
  allSubjects: SubjectModel[] = [];


  constructor(
    private tools: ToolsService,
    public dialogRef: MatDialogRef<InviteUserComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.update();
  //   this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
  //     startWith(null),
  //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  userEmail = '';
  isLoading = false;

  ngOnInit(): void {


  }
  cancel() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(event);

    this.fruitCtrl.setValue(null);
  }

  remove(subject: SubjectModel): void {
    this.adminService.editSubjectsInTeacher(this.data.teacherId, subject.id).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.adminService.editSubjectsInTeacher(this.data.teacherId, event.option.value.id).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
    // this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }

  update() {
    this.isLoading = true;
    this.adminService.getAllSubjects().subscribe((data) => {
      this.allSubjects = data;
      this.adminService.getTeacherSubjects(this.data.teacherId).subscribe((subjects) => {
        this.subjects = subjects;
        this.isLoading = false;
        this.subjects.forEach(element => {
          if (this.allSubjects.find(x => x.id === element.id)) {
            this.allSubjects =  this.allSubjects.filter(x => x.id !== element.id);
          }
        });
      });
    });
  }
  close() {
    this.dialogRef.close();
  }

}
