import { Router } from '@angular/router';
import { LoggerService } from '../services';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardService {
  isLogged: boolean = false;
  constructor(private loggerService: LoggerService, private router: Router) {
    this.loggerService.isLogged
      .asObservable()
      .subscribe((data: boolean) => (this.isLogged = data));
  }

  canActivate() {
    if (this.isLogged) return true;
    this.router.navigateByUrl('/login');
    return false;
  }
}
