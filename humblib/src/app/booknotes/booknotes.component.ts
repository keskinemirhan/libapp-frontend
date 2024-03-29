import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booknotes',
  templateUrl: './booknotes.component.html',
  styleUrls: ['./booknotes.component.css'],
})
export class BooknotesComponent implements OnInit {
  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute
  ) {
    this.libraryService.loading.asObservable().subscribe((data: boolean) => {
      this.loading = data;
    });
  }

  notes: any[] = [];
  bookId: number = 0;
  book: any = {};
  loading = true;
  deleteNote(id: number) {
    this.libraryService.deleteNote(id);
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getAllNotes$();
    this.libraryService.notesState
      .asObservable()
      .subscribe(
        (data: any) =>
          (this.notes = data.filter((data: any) => data.book.id == this.bookId))
      );
    this.libraryService.loading.next(true);
    this.book = this.libraryService
      .getBook$(this.bookId)
      .subscribe((data: any) => {
        this.libraryService.loading.next(true);
        this.book = data;
        this.libraryService.loading.next(false);
      });
  }
}
