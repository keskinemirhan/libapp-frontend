import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../core/services/logger.service';
import { Router } from '@angular/router';
import { LibraryService } from '../core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public loggerService: LoggerService,
    private router: Router,
    private libraryService: LibraryService
  ) {}
  profile = '';
  isLogged = false;

  logout() {
    this.loggerService.deleteLogInfo();
    this.libraryService.flushStates();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.loggerService.isLogged.asObservable().subscribe((data: boolean) => {
      this.isLogged = data;
      this.loggerService.profileName.asObservable().subscribe((data: any) => {
        if (data) this.profile = data;
        else this.profile = 'Login';
      });
    });
  }
}
