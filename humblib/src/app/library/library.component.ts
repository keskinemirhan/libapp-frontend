import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';
import { ReceivedCategoryModel, ReceivedNoteModel } from '../core/models';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  constructor(public libraryService: LibraryService) {}

  categories: any = [];
  books: any = [];
  notes: ReceivedNoteModel[] = [];

  isCat(book: any, cat: any) {
    return book.categories.some((e: any) => e.name === cat.name);
  }

  getNotesCount(id: any) {
    return this.notes.filter((data: ReceivedNoteModel) => data.book.id === id)
      .length;
  }

  ngOnInit(): void {
    this.libraryService.getCategoriesArray$();
    this.libraryService.getBooks$();
    this.libraryService.getAllNotes$();
    this.libraryService.categoriesState
      .asObservable()
      .subscribe((data: any) => (this.categories = data));
    this.libraryService.booksState
      .asObservable()
      .subscribe((data: any) => (this.books = data));
    this.libraryService.notesState.subscribe(
      (data: any) => (this.notes = data)
    );
  }
}
