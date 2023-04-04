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
  ) {}

  notes: any[] = [];
  bookId: number = 0;
  book: any = {};

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService
      .getNotesByBook$(this.bookId)
      .subscribe((data: any) => (this.notes = data));
    this.book = this.libraryService
      .getBook$(this.bookId)
      .subscribe((data: any) => (this.book = data));
  }
}
