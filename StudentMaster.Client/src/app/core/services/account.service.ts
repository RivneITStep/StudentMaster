import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  changeAvatar(base64: string) {
    return this.http.post<string>(API + '/api/Account/change-avatar-image', {base64});
  }
}
