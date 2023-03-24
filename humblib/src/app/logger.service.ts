import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOG_URL, PROF_URL } from './var';
@Injectable()
export class LoggerService {
  constructor(private http: HttpClient) {}
  isLogged: boolean = false;
  token: string = '';
  profileName = '';
  feedBack = '';

  login(email: string, password: string) {
    return this.http.post(LOG_URL, {
      email,
      password,
    });
  }

  getProfile(token: string) {
    return this.http.get(PROF_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
