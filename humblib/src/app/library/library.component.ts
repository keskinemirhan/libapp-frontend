import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';
import { ReceivedCategoryModel } from '../core/models';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  constructor(public libraryService: LibraryService) {}

  categories: any = [];
  books: any = [];
  isCat(book: any, cat: any) {
    return book.categories.some((e: any) => e.name === cat.name);
  }
  ngOnInit(): void {
    this.libraryService.getCategoriesArray$();
    this.libraryService.getBooks$();
    this.libraryService.categoriesState
      .asObservable()
      .subscribe((data: any) => (this.categories = data));
    this.libraryService.booksState
      .asObservable()
      .subscribe((data: any) => (this.books = data));
  }
}
