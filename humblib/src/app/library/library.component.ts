import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  constructor(public libraryService: LibraryService) {}

  isCat(book: any, cat: any) {
    return book.categories.some((e: any) => e.name === cat.name);
  }
  ngOnInit(): void {
    this.libraryService.getCategories();
    this.libraryService.getBooks();
  }
}
