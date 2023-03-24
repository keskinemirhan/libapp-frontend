import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { BASE_URL, BOOK_URL } from './var';

@Injectable()
export class LibraryService {
  constructor(private http: HttpClient, private loggerService: LoggerService) {}

  getBooks(id: number) {
    return this.http
      .get(BOOK_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe((data: any) => {
        return data;
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
}
