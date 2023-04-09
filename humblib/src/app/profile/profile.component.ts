import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public loggerService: LoggerService) {}
  profile = '';

  ngOnInit(): void {
    this.loggerService.isLogged.asObservable().subscribe((data: boolean) => {
      this.loggerService.profileName.asObservable().subscribe((data: any) => {
        if (data) this.profile = data;
        else this.profile = 'Login';
      });
    });
  }
}
