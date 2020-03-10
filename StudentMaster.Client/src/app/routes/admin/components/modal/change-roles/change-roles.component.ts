import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToolsService } from '@core/services/tools.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InviteUserComponent } from '../invite-user/invite-user.component';
import { AdminService } from '@core/services/admin.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { SubjectModel } from '@core/models/subject-model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-change-roles',
  templateUrl: './change-roles.component.html',
  styleUrls: ['./change-roles.component.scss']
})
export class ChangeRolesComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;

  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  roles: string[] = [];
  allRoles: string[] = [];


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

  remove(role: SubjectModel): void {
    this.adminService.changeRolesInUser(this.data.uid, role).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.adminService.changeRolesInUser(this.data.uid, event.option.value).subscribe(() => {
      this.tools.showNotification('Success');
      this.update();
    });
    // this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }

  update() {
    this.isLoading = true;
    this.adminService.getAllRoles().subscribe((data) => {
      this.allRoles = data;
      this.adminService.getRolesByUID(this.data.uid).subscribe((roles) => {
        this.roles = roles;
        this.isLoading = false;
        this.roles.forEach(element => {
          if (this.allRoles.find(x => x === element)) {
            this.allRoles =  this.allRoles.filter(x => x !== element);
          }
        });
      });
    });
  }
  close() {
    this.dialogRef.close();
  }

}
