import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public loggerService: LoggerService, private router: Router) {}
  model = { email: 'user@email.com', password: 'password' };
  onSubmit() {
    this.loggerService
      .login(this.model.email, this.model.password)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.loggerService.feedBack = err.message;
          throw err;
        })
      )
      .subscribe((data: any) => {
        this.loggerService.isLogged = true;
        this.loggerService.token = data.access_token;
        this.loggerService
          .getProfile(this.loggerService.token)
          .subscribe((data: any) => {
            this.loggerService.profileName = data.username;
            localStorage.setItem('humblibToken', this.loggerService.token);
            return this.router.navigate(['/']);
          });
      });
  }
}
