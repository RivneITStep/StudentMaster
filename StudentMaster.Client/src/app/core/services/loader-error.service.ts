import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@core/redux/state/app.state';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderErrorService {
  isLoading = false;
  constructor(private store: Store<IAppState>, private spinner: NgxSpinnerService) {
    this.store.select('homeworks').subscribe(x => {
      console.log(x);
    });
  }
}
