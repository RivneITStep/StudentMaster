import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@core';
import { ToolsService } from '@core/services/tools.service';
import { MatStepper } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { ResetPassword } from '@core/redux/actions/account.actions';
import { selectAccountIsSuccess } from '@core/redux/selectors/account.selectors';
import { AccountService } from '@core/services/account.service';
import { runInThisContext } from 'vm';
import { ErrorResponse } from '@core/models/errorResponse.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isLinear = true;
  emailOrPhoneNumber: FormGroup;
  newPasswrod: FormGroup;
  error = '';
  done = '';
  isLoading = false;
  isSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    private tools: ToolsService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.emailOrPhoneNumber = this.formBuilder.group({
      data: ['', Validators.required],
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
    const email = this.emailOrPhoneNumber.get('data').value;
    const newPassword = this.newPasswrod.get('password').value;

  }
  sendResetPasswordRequest(stepper: MatStepper) {
    const email = this.emailOrPhoneNumber.get('data').value;
    this.isLoading = true;
    this.accountService.resetPasswordRequest(email).subscribe(_ => {
      this.isLoading = false;
      stepper.next();
    }, _ => {
      this.isLoading = false;
    });
  }

}
