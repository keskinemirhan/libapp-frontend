import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';

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
    this.loggerService.register(
      this.form.value.username,
      this.form.value.password,
      this.form.value.email
    );
    this.router.navigateByUrl('/login');
  }
}
