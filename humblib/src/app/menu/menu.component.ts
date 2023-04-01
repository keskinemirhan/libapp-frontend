import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../core';
import { LoggerService } from '../core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private loggerService: LoggerService, private router: Router) {}
  clickList() {
    if (!this.loggerService.isLogged) this.router.navigate(['/login']);
  }
}
