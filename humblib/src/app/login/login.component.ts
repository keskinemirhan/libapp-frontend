import { Component } from '@angular/core';
import { LoggerService, status } from '../core/services/logger.service';
import { Router } from '@angular/router';
import { Login } from '../core/models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    const credentials: Login = {
      email: this.form.value.username,
      password: this.form.value.password,
    };
    this.loggerService.login(credentials);

    this.loggerService.logStatus.asObservable().subscribe((data: number) => {
      if (data === status.DONE) this.router.navigateByUrl('/');
    });
  }
}
