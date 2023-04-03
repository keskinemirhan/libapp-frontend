import { Component } from '@angular/core';
import { LoggerService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private loggerService: LoggerService) {
    this.loggerService.initLogin();
  }
  title = 'humblib';
}
