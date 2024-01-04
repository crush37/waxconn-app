import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  csrfCookie(): Observable<boolean> {
    return this.httpClient.get<boolean>('sanctum/csrf-cookie');
  }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<boolean>('auth/check');
  }

  login(params: { email: string, password: string }): Observable<boolean> {
    return this.httpClient.post<boolean>('auth/login', params);
  }

  logout(): Observable<boolean> {
    return this.httpClient.post<boolean>('auth/logout', {});
  }

  activate(
    id: string,
    hash: string,
    signature: string,
    params: { password: string, passwordConfirmation: string }
  ): Observable<any> {
    const url = 'auth/activate/' + id + '/' + hash + '?signature=' + signature;
    return this.httpClient.post<boolean>(url, {
      password: params.password,
      password_confirmation: params.passwordConfirmation
    });
  }
}
