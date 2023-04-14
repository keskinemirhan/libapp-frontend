import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  constructor(public libraryService: LibraryService) {}
  notes: any[] = [];
  loading: boolean = true;
  ngOnInit() {
    this.libraryService.loading.asObservable().subscribe((data: boolean) => {
      this.loading = data;
    });
    this.libraryService.getAllNotes$();
    this.libraryService.notesState
      .asObservable()
      .subscribe((data: any) => (this.notes = data));
  }
}
