import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { BASE_URL, BOOK_URL, CAT_URL } from './var';

@Injectable()
export class LibraryService {
  constructor(private http: HttpClient, private loggerService: LoggerService) {}
  books: Array<any> = [];
  categories: Array<any> = [];

  //=================== BOOKS ==================
  getBooks() {
    return this.http
      .get(BOOK_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe((data: any) => {
        this.books = data;
      });
  }

  //   getBook() {}

  //   patchBook() {}

  //   deleteBook() {}

  createBook(name: string, categories: Array<string>) {
    return this.http
      .post(BOOK_URL, {
        name,
        categories: [],
      })
      .subscribe((data: any) =>
        this.http.patch(BOOK_URL, {
          bookId: data.id,
          bookName: name,
          categories,
        })
      );
  }

  //=================== CATEGORIES ==================

  getCategories() {
    return this.http
      .get(CAT_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe((data: any) => (this.categories = data));
  }
}
