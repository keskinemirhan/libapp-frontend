import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LOG_URL, PROF_URL, USER_URL } from './var';
import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { Login, Register } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  isLogged = new BehaviorSubject<boolean>(false);
  profileName = new BehaviorSubject<string>('');
  serverResponse = new BehaviorSubject<string>('');

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private apiService: ApiService
  ) {}

  initLogin() {
    const token = this.tokenService.getToken();
    if (token) {
      this.isLogged.next(true);
      this.apiService.get$(PROF_URL).subscribe({
        next: (data: any) => {
          this.setLogInfo(data.username);
        },
        error: (err) => this.deleteLogInfo(),
      });
    }
  }

  deleteLogInfo() {
    this.profileName.next('');
    this.isLogged.next(false);
  }

  setLogInfo(username: string) {
    this.isLogged.next(true);
    this.profileName.next(username);
  }

  login(credentials: Login) {
    this.apiService.post$(LOG_URL, credentials).subscribe({
      next: (data: any) => {
        this.tokenService.setToken(data.access_token);
        this.apiService.get$(PROF_URL).subscribe({
          next: (data: any) => {
            this.setLogInfo(data.username);
          },
        });
      },
      error: (err) => this.serverResponse.next(err),
    });
  }

  register(credentials: Register) {
    return this.apiService.post$(USER_URL, credentials).subscribe({
      next: (data: any) => {
        this.login({
          email: credentials.email,
          password: credentials.password,
        });
      },
      error: (err) => this.serverResponse.next(err),
    });
  }

  // login(email: string, password: string) {
  //   return this.http.post(LOG_URL, {
  //     email,
  //     password,
  //   });
  // }

  // register(username: string, password: string, email: string) {
  //   return this.http
  //     .post(USER_URL, {
  //       username,
  //       email,
  //       password,
  //     })
  //     .subscribe();
  // }

  // getProfile(token: string) {
  //   return this.http.get(PROF_URL, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
}
