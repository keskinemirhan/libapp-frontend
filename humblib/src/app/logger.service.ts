import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOG_URL, PROF_URL, USER_URL } from './var';
@Injectable()
export class LoggerService {
  isLogged: boolean = false;
  token: string = '';
  profileName = '';
  feedBack = '';

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('humblibToken')) {
      this.isLogged = true;
      this.token = localStorage.getItem('token') as string;
      this.getProfile(this.token).subscribe((data: any) => {
        this.profileName = data.username;
      });
    }
  }

  login(email: string, password: string) {
    return this.http.post(LOG_URL, {
      email,
      password,
    });
  }

  register(username: string, password: string, email: string) {
    return this.http
      .post(USER_URL, {
        username,
        email,
        password,
      })
      .subscribe();
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
