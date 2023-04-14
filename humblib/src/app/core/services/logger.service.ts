import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { LOG_URL, PROF_URL, USER_URL } from './var';
import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { Login, Register } from '../models';

export enum status {
  EMPTY = 0,
  WAITING = 1,
  DONE = 2,
  FAILED = 3,
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  isLogged = new BehaviorSubject<boolean>(false);
  profileName = new BehaviorSubject<string>('');
  loading = new BehaviorSubject<boolean>(false);
  serverResponse = new BehaviorSubject<string>('');
  logStatus = new BehaviorSubject<number>(status.EMPTY);
  constructor(
    private tokenService: TokenService,
    private apiService: ApiService
  ) {}

  async initLogin() {
    this.loading.next(true);
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const response: any = await lastValueFrom(
          this.apiService.get$(PROF_URL)
        );
        this.isLogged.next(true);
        this.setLogInfo(response.username);
        this.loading.next(false);
      } catch (err) {
        this.deleteLogInfo();
        this.isLogged.next(false);
        this.loading.next(false);
        throw err;
      }

      // subscribe({
      //   next: (data: any) => {
      //     this.isLogged.next(true);
      //     this.setLogInfo(data.username);
      //   },
      //   error: (err) => {
      //     this.deleteLogInfo();
      //     this.isLogged.next(false);
      //     throw err;
      //   },
      // });
    }
    this.loading.next(false);
  }

  deleteLogInfo() {
    this.loading.next(true);
    this.tokenService.deleteToken();
    this.profileName.next('');
    this.isLogged.next(false);
    this.loading.next(false);
  }

  setLogInfo(username: string) {
    this.loading.next(true);
    this.isLogged.next(true);
    this.profileName.next(username);
    this.loading.next(false);
  }

  login(credentials: Login) {
    this.loading.next(true);
    this.logStatus.next(status.WAITING);
    this.deleteLogInfo();
    this.apiService.post$(LOG_URL, credentials).subscribe({
      next: (data: any) => {
        this.tokenService.setToken(data.access_token);
        this.apiService.get$(PROF_URL).subscribe({
          next: (data: any) => {
            this.setLogInfo(data.username);
            this.logStatus.next(status.DONE);
            this.loading.next(false);
          },
        });
      },
      error: (err) => {
        this.serverResponse.next(err);
        this.logStatus.next(status.FAILED);
        this.loading.next(false);
        throw err;
      },
      complete: () => {
        this.logStatus.next(status.WAITING);
        this.loading.next(false);
      },
    });
  }

  register(credentials: Register) {
    this.loading.next(true);
    return this.apiService.post$(USER_URL, credentials).subscribe({
      next: (data: any) => {
        this.login({
          email: credentials.email,
          password: credentials.password,
        });
        this.loading.next(false);
      },
      error: (err) => {
        this.serverResponse.next(err);
        this.loading.next(false);
        throw err;
      },
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
