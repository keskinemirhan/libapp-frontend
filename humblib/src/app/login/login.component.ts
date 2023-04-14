import { Component } from '@angular/core';
import { LoggerService } from '../core/services/logger.service';
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
  loading = true;
  constructor(private fb: FormBuilder, public loggerService: LoggerService) {
    this.loggerService.loading.asObservable().subscribe((data: boolean) => {
      this.loading = data;
    });

    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
      ]),
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    const credentials: Login = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.loggerService.login(credentials);
  }
}
