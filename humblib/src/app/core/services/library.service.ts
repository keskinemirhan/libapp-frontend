import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from './logger.service';
import { BOOK_URL, CAT_FLAT_URL, CAT_URL, NOTES_URL } from './var';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  constructor(private http: HttpClient, private loggerService: LoggerService) {}
  books: Array<any> = [];
  categories_nested: any;
  categories: Array<any> = [];
  subCategories = new BehaviorSubject(0);

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

  patchBook(bookId: number, bookName: string, categories: string[]) {
    return this.http
      .patch(
        BOOK_URL,
        {
          bookId,
          bookName,
          categories,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.loggerService.token}`,
          },
        }
      )
      .subscribe();
  }

  deleteBook(id: number) {
    return this.http
      .delete(BOOK_URL + `/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe();
  }

  createBook(name: string, categories: Array<string>) {
    return this.http
      .post(
        BOOK_URL,
        {
          name,
          categories: [],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.loggerService.token}`,
          },
        }
      )
      .subscribe((data: any) => {
        this.http
          .patch(
            BOOK_URL,
            {
              bookId: data.id,
              bookName: name,
              categories: categories,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.loggerService.token}`,
              },
            }
          )
          .subscribe();
      });
  }

  //=================== CATEGORIES ==================

  getCategoriesNested() {
    return this.http
      .get(CAT_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe((data: any) => (this.categories_nested = data));
  }

  getCategory(id: number) {
    return this.http
      .get(CAT_URL + `/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe();
  }

  getCategoriesArray() {
    return this.http
      .get(CAT_FLAT_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loggerService.token}`,
        },
      })
      .subscribe((data: any) => (this.categories = data));
  }

  deleteCategory(id: number) {
    this.http.delete(CAT_URL + `/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.loggerService.token}`,
      },
    });
  }

  createCategory(name: string, topCategory: string) {
    this.http
      .post(
        CAT_URL,
        {
          name,
          topCategory,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.loggerService.token}`,
          },
        }
      )
      .subscribe();
  }
  //======================================================

  //======================= NOTES ========================

  getAllNotes() {
    return this.http.get(NOTES_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.loggerService.token}`,
      },
    });
  }

  createNote(title: string, note: string, bookId: number) {
    return this.http
      .post(
        NOTES_URL,
        {
          bookId,
          title,
          note,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.loggerService.token}`,
          },
        }
      )
      .subscribe();
  }

  //======================================================
}
