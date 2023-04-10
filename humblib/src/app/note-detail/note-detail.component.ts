import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
})
export class NoteDetailComponent implements OnInit {
  note: any = {};
  noteId: number = 0;
  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteNote(id: number) {
    this.libraryService.deleteNote(id);
    this.router.navigateByUrl('/booknotes/' + this.note.book.id);
  }

  ngOnInit(): void {
    this.noteId = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getAllNotes$();
    this.libraryService.notesState
      .asObservable()
      .subscribe(
        (data: any) =>
          (this.note = data.find((data: any) => data.id === this.noteId))
      );
  }
}
