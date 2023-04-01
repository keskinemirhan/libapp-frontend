import { Component } from '@angular/core';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(public loggerService: LoggerService) {}
  profileName: string = '';
}
