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
  confirmCode: FormGroup;
  newPasswrod: FormGroup;
  error = 'Your password has been changed! ';
  isLoading = false;
  isSuccess = false;


  email = '';
  code = '';


  constructor(
    private formBuilder: FormBuilder,
    private tools: ToolsService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.emailOrPhoneNumber = this.formBuilder.group({
      data: ['', Validators.required],
    });
    this.confirmCode = this.formBuilder.group({
      code: ['', Validators.required],
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
    this.email = email;
    this.isLoading = true;
    this.accountService.resetPasswordRequest(email).subscribe(_ => {
      this.isLoading = false;
      stepper.next();
    }, _ => {
      this.isLoading = false;
    });
  }
  useConfirmCodeWithEmail(strepper: MatStepper) {
    var code = this.confirmCode.get('code').value;
    this.code = code;
    this.isLoading = true;
    this.accountService.useConfirmCodeWithEmail(this.email, code).subscribe(_ => {
      this.isLoading = false;
      strepper.next();
    }, _ => {
      this.isLoading = false;
    });
  }
  changePassword(stepper: MatStepper) {
    var password = this.newPasswrod.get('password').value;

    this.isLoading = true;
    this.accountService.chengePasswordWithoutPassword(this.email, this.code, password).subscribe(x => {
      this.isLoading = false;
      stepper.next();
    }, _ => {
      this.isLoading = false;
    });
  }

}
