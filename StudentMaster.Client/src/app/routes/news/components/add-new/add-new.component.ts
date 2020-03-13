import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private adminService: AdminService,  public dialogRef: MatDialogRef<AddNewComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }
  onSubmit() {
    const data = this.form.value;
    this.adminService.addNew(data.title, data.text).subscribe(() => {
      this.dialogRef.close();
    }, () => {
      this.dialogRef.close();
    });
  }

}
