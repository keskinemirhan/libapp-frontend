import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loggerService: LoggerService, private router: Router) {}
  model = { email: 'user@email.com', password: 'password' };
  onSubmit() {
    this.loggerService
      .login(this.model.email, this.model.password)
      .subscribe((data: any) => {
        this.loggerService.isLogged = true;
        this.loggerService.token = data.access_token;
        return this.router.navigate(['/']);
      });
  }
}
