import { Component } from '@angular/core';
import { LoggerService } from '../core/services/logger.service';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public loggerService: LoggerService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    const credentials: Login = {
      email: this.form.value.username,
      password: this.form.value.password,
    };
    this.loggerService.login(credentials);
    if (this.loggerService.isLogged.getValue()) this.router.navigateByUrl('/');
  }
}
