import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken() {
    return window.localStorage.getItem('authToken');
  }
  setToken(token: string) {
    return window.localStorage.setItem('authToken', token);
  }
  deleteToken() {
    return window.localStorage.removeItem('authToken');
  }
}
