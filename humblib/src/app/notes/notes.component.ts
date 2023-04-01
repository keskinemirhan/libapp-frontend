import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../core';
import { LoggerService } from '../core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  constructor(
    private router: Router,
    public libraryService: LibraryService,
    private loggerService: LoggerService
  ) {}
  notes: any[] = [];
  ngOnInit() {
    if (!this.loggerService.isLogged) {
      return this.router.navigate(['/login']);
    }
    return this.libraryService
      .getAllNotes()
      .subscribe((data: any) => (this.notes = data));
  }
}
