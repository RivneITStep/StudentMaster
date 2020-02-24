import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  NOTIFY_OPTIONS,
  CURRENT_USER,
  JWT_TOKEN,
  REFRESH_TOKEN,
  TOKEN_VALID_TO,
  MAT_NOTIFY_OPTIONS,
} from '@core/config';
import { User } from '@core/models/user';
import { AuthenticationService } from '@core/services/authentication.service';
import { ToolsService } from '@core/services/tools.service';
import { ShowLoader, HideLoader } from '@core/redux/actions/loader.actions';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  private isTokenRefreshing = false;

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private AuthService: AuthenticationService,
    private tools: ToolsService,
    private store: Store<IAppState>,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the user is logging in for the first time
    this.store.dispatch(new ShowLoader());
    return next.handle(this.attachTokenToRequest(request)).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Success');
        }
      }),
      finalize(() => this.store.dispatch(new HideLoader())),
      catchError(
        (error): Observable<any> => {
          if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
              case 401:
                console.log('Token expired. Attempting refresh ...');
                return this.handleHttpResponseError(request, next);
            }
            return throwError(this.handleError(error as HttpErrorResponse));
          }
        }
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorString = 'Unknown error...';

    if (error.status === 0) {
      errorString = 'Server is offline...';
    }
    if (error.status === 400) {
      errorString = error.error.message;
    }
    if (error.status === 403) {
      this.router.navigate(['/sessions/403']);
    }
    if (error.error !== null ) {
      if (error.error.action === 'relogin') {
        errorString = 'Please relogin!!!';
        this.AuthService.logout();
      }
    }
    // SHOW ERROR
    this.tools.showNotification(errorString);

    return throwError(error);
  }

  // Method to handle http error response
  private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler) {
    // First thing to check if the token is in process of refreshing
    if (!this.isTokenRefreshing) {
      // If the Token Refresheing is not true
      this.isTokenRefreshing = true;

      // Any existing value is set to null
      // Reset here so that the following requests wait until the token comes back from the refresh token API call
      this.tokenSubject.next(null);

      /// call the API to refresh the token
      return this.AuthService.Refresh().pipe(
        switchMap((user: User) => {
          if (user) {
            this.tokenSubject.next(user.access_token);
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            localStorage.setItem(JWT_TOKEN, user.access_token);
            localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
            console.log('Token refreshed...');
            return next.handle(this.attachTokenToRequest(request));
          }
          return this.AuthService.logout() as any;
        }),
        catchError(err => {
          this.AuthService.logout();
          return this.handleError(err);
        }),
        finalize(() => {
          this.isTokenRefreshing = false;
        })
      );
    } else {
      this.isTokenRefreshing = false;
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          return next.handle(this.attachTokenToRequest(request));
        })
      );
    }
  }

  private attachTokenToRequest(request: HttpRequest<any>) {
    if (localStorage.getItem(JWT_TOKEN) && !this.AuthService.isTokenExpired()) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}` },
      });
    }
    return request;
  }
}
