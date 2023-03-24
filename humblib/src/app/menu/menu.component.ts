import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(
    private libraryService: LibraryService,
    private loggerService: LoggerService,
    private router: Router
  ) {}
  clickList() {
    if (!this.loggerService.isLogged) this.router.navigate(['/login']);
  }
}
