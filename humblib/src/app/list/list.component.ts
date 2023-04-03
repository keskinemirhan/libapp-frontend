import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(public libraryService: LibraryService, private router: Router) {}
  books: any = [];
  ngOnInit(): void {
    this.libraryService.getBooks$();
    this.libraryService.booksState
      .asObservable()
      .subscribe((data: any) => (this.books = data));
  }
  onDelete(id: number) {
    this.libraryService.deleteBook$(id);
  }
}
