import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, Servers, changeAPI } from '@core';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { Logout, Authorize } from '@core/redux/actions/auth.actions';
import {Server} from '@core/models/server';
import { MatSelectChange } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  isLoading = false;
  servers: Server[] = [];
  selectedServer: number = 0;
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.servers = Servers;
    this.store.dispatch(new Logout());
  }
  Test() {
    alert('clicked');
  }
  login() {
    const data = this.reactiveForm.value;
    this.store.dispatch(new Authorize(data));

    // tslint:disable-next-line: no-shadowed-variable
    this.store.select('auth').subscribe(data => {
      this.isLoading = data.isLoading;
      if (data.isAuthorize && data.user) {
        if (this.route.snapshot.queryParamMap.get('returnUrl')) {
          this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl')]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
    // this.router.navigateByUrl('/');
  }
  onServerChange(event: MatSelectChange ) {
    changeAPI(this.servers.find( x => x.id === event.value).url);
  }
}
