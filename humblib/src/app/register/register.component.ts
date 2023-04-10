import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    const register: Register = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
    };
    this.loggerService.register(register);
  }
}
