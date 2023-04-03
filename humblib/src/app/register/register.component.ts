import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from '../core/services/logger.service';
import { Register } from '../core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loggerService: LoggerService
  ) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
    });
  }

  onSubmit() {
    const register: Register = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
    };
    this.loggerService.register(register);
  }
}
