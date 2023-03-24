import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class LoggerService {
  constructor(private http: HttpClient) {}
  isLogged: boolean = false;
  token: string = '';
  profileName = '';
  feedBack = '';

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/users/login', {
      email,
      password,
    });
  }

  getProfile(token: string) {
    return this.http.get('http://localhost:3000/users/profile', {
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      },
    });
  }
}
