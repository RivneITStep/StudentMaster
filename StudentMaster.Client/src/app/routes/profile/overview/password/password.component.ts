import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, NOTIFY_OPTIONS } from '@core';
import { MatStepper } from '@angular/material/stepper';
import { ToolsService } from '@core/services/tools.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  isLinear = true;
  currentPassword: FormGroup;
  newPasswrod: FormGroup;
  error = '';
  done = '';
  constructor(
    private formBuilder: FormBuilder,
    private aS: AuthenticationService,
    private tools: ToolsService
  ) {}

  ngOnInit() {
    this.currentPassword = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.newPasswrod = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirm: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirm.value;
    if (pass === confirmPass) {
      return null;
    } else {
      group.controls.confirm.setErrors({ MatchPassword: true });
    }
  }
  onSubmit(stepper: MatStepper) {
    const current = this.currentPassword.get('password').value;
    const newPassword = this.newPasswrod.get('password').value;
    this.aS.changePassword(current, newPassword).subscribe(
      (x: string) => {
        this.done = x;
        this.tools.showNotification('Your password has been changed!');

        stepper.next();
      },
      _ => {
        stepper.reset();
      }
    );
  }
}
