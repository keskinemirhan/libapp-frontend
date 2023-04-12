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
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(256),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
        Validators.minLength(8),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  handleErrors(fieldName: string) {
    //@ts-ignore
    const field = this.form.get(fieldName);
    //@ts-ignore
    console.log(field.errors);
    //@ts-ignore
    if (field.errors['minlength']) {
      return 'Too short';
    }
    //@ts-ignore
    else if (field.errors['maxlength']) {
      return 'Too long';
      //@ts-ignore
    } else if (field.errors['required']) {
      return 'Required';
    } else return 'Invalid';
  }

  onSubmit() {
    if (!this.form.valid) return;
    const register: Register = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
    };
    this.loggerService.register(register);
    this.router.navigateByUrl('/');
  }
}
