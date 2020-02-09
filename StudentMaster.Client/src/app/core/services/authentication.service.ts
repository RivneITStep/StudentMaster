import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { CURRENT_USER, API, JWT_TOKEN, REFRESH_TOKEN, SELECTED_SERVER, changeAPI } from '../config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { IAppState } from '@core/redux/state/app.state';
import { Store } from '@ngrx/store';
import { AuthorizeSuccess } from '@core/redux/actions/auth.actions';
import { isNullOrUndefined } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private jwtHelper = new JwtHelperService();
  private user: User = null;

  constructor(private http: HttpClient, private router: Router, private store: Store<IAppState>) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(CURRENT_USER))
    );
    if (localStorage.getItem(SELECTED_SERVER) !== undefined && localStorage.getItem(SELECTED_SERVER) !== null) {
      changeAPI(localStorage.getItem(SELECTED_SERVER));
    }

    this.store.dispatch(new AuthorizeSuccess(JSON.parse(localStorage.getItem(CURRENT_USER))));
    this.store.select('auth').subscribe(data => {
      this.user = data.user;
    });
    this.currentUser = this.currentUserSubject.asObservable();
  }

  Refresh() {
    return this.http
      .post<User>(`${API}/api/Auth/Refresh`, {
        token: this.user.access_token,
        refresh: this.user.refresh_token,
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.access_token) {
            this.store.dispatch(new AuthorizeSuccess(user));
          }

          return user;
        })
      );
  }

  getAccess(email: string) {
    return this.http.post<User>(`${API}/api/Auth/getAccessAsync`, { email });
  }
  login(email: string, password: string) {
    return this.http.post<User>(`${API}/api/Auth/Authorize`, { email, password }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          localStorage.setItem(CURRENT_USER, JSON.stringify(user));
          localStorage.setItem(JWT_TOKEN, user.access_token);
          localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
          localStorage.setItem(SELECTED_SERVER, API);
        }

        return user;
      })
    );
  }
  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post(`${API}/api/Auth/changePassword`, { currentPassword, newPassword });
  }
  hasRoleObserver(role: string): BehaviorSubject<boolean> {
    if (this.user) {
      return new BehaviorSubject(
        !!this.getUserRole().find(x => x.toLocaleLowerCase() === role.toLocaleLowerCase())
      );
    } else {
      return new BehaviorSubject(false);
    }
  }
  HasRole(role: string): boolean {
    if (this.user) {
      if (Array.isArray(this.getUserRole())) {
        return !!this.getUserRole().find(x => x.toLocaleLowerCase() === role.toLocaleLowerCase());
      } else {
        return this.getUserRole().toString() === role;
      }
    } else {
      return false;
    }
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(SELECTED_SERVER);
    this.router.navigate(['/auth/login']);

    return new Observable<any>();
  }

  loggedIn() {
    if (localStorage.getItem(JWT_TOKEN)) {
      const token = localStorage.getItem(JWT_TOKEN);
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
  isTokenExpired() {
    if (localStorage.getItem(JWT_TOKEN)) {
      const token = localStorage.getItem(JWT_TOKEN);
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }
  getUserRole(): string[] {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } else {
      return [];
    }
  }

  getUserId(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    } else {
      return null;
    }
  }
  getEmail(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['email'];
    }
  }
  getFullName(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['fullname'];
    }
  }
  getLogin(): string {
    if (localStorage.getItem(JWT_TOKEN)) {
      const tokenPayload = this.getTokenPayload();
      return tokenPayload['login'];
    }
  }
  getTokenPayload(): string {
    return this.jwtHelper.decodeToken(localStorage.getItem(JWT_TOKEN));
  }
}
