import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './var';
@Injectable()
export class LoggerService {
  constructor(private http: HttpClient) {}
  isLogged: boolean = false;
  token: string = '';
  profileName = '';
  feedBack = '';

  login(email: string, password: string) {
    return this.http.post(BASE_URL + '/users/login', {
      email,
      password,
    });
  }

  getProfile(token: string) {
    return this.http.get(BASE_URL + '/users/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
