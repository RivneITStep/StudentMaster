import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountService } from '@core/services/account.service';
import { ToolsService } from '@core/services/tools.service';
import { MatSelectChange } from '@angular/material/select';
import { changeAPI, Servers } from '@core';
import { Server } from '@core/models/server';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;
  isLoading = false;
  servers: Server[] = [];

  constructor(private fb: FormBuilder, private accountService: AccountService, private tools: ToolsService) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
      code: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.servers = Servers;
  }
  public onSubmit() {
    const data = this.reactiveForm.value;
    this.isLoading = true;
    this.accountService.createAccount(data.username, data.firstname, data.name, data.lastname, data.password, data.code).subscribe(() => {
      this.isLoading = false;
      this.tools.showNotification('Account has been updated!');
    }, () => this.isLoading = false);
  }
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.reactiveForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };
  onServerChange(event: MatSelectChange ) {
    changeAPI(this.servers.find( x => x.id === event.value).url);
  }
}
