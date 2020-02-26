import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ToolsService } from '@core/services/tools.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InviteUserComponent } from '../invite-user/invite-user.component';
import { AdminService } from '@core/services/admin.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { SubjectModel } from '@core/models/subject-model';

@Component({
  selector: 'app-edit-subjects-in-class',
  templateUrl: './edit-subjects-in-class.component.html',
  styleUrls: ['./edit-subjects-in-class.component.scss']
})
export class EditSubjectsInClassComponent implements OnInit {
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
  onSubmit() {
    this.isLoading = true;
    this.adminService.inviteUser(this.userEmail, this.data.classId).subscribe(() => {
      this.tools.showNotification('User has been invited');
      this.isLoading = false;
      this.dialogRef.close();
    }, () => {
      this.isLoading = false;
      this.dialogRef.close();
    });
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(event);

    this.fruitCtrl.setValue(null);
  }

  remove(subject: SubjectModel): void {
    this.adminService.editSubjectsInClass(this.data.classId, subject.id).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.adminService.editSubjectsInClass(this.data.classId, event.option.value.id).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
    // this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }

  update() {
    this.adminService.getAllSubjects().subscribe((data) => {
      this.allSubjects = data;
      this.adminService.getClassSubjects(this.data.classId).subscribe((subjects) => {
        this.subjects = subjects;
        this.subjects.forEach(element => {
          if (this.allSubjects.find(x => x.id === element.id)) {
            this.allSubjects =  this.allSubjects.filter(x => x.id !== element.id);
          }
        });
      });
    });
  }

}
