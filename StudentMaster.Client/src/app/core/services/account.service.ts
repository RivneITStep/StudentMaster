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
  resetPasswordRequest(data: string) {
    return this.http.get<string>(API + '/api/Account/reset-password-request/' + data);
  }
  useConfirmCodeWithEmail(email: string, code: string) {
    return this.http.get<string>(API + '/api/Account/check-confirm-code/' + email + '/' + code);
  }
  chengePasswordWithoutPassword(email, code, password) {
    return this.http.get<string>(API + '/api/Account/change-password-without-password/' + email + '/' + code + '/' + password);
  }
}
