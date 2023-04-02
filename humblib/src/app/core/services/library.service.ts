import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from './logger.service';
import { BOOK_URL, CAT_FLAT_URL, CAT_URL, NOTES_URL } from './var';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private loggerService: LoggerService
  ) {}
  books: Array<any> = [];
  categories_nested: any;
  categories: Array<any> = [];
  subCategories = new BehaviorSubject(0);

  //=================== BOOKS ==================

  getBooks$() {
    return this.apiService.get$(BOOK_URL);
  }

  //   getBook() {}

  patchBook$(body: any) {
    return this.apiService.patch$(BOOK_URL, body);
  }

  deleteBook$(id: number) {
    return this.apiService.delete$(BOOK_URL);
  }

  //temporary implementation
  createBook$(body: any) {
    return this.apiService
      .post$(BOOK_URL, body)
      .pipe((data: any) =>
        this.apiService.patch$(BOOK_URL, { bookId: data.bookId, ...body })
      );
  }
  // createBook(name: string, categories: Array<string>) {
  //   return this.http
  //     .post(
  //       BOOK_URL,
  //       {
  //         name,
  //         categories: [],
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${this.loggerService.token}`,
  //         },
  //       }
  //     )
  //     .subscribe((data: any) => {
  //       this.http
  //         .patch(
  //           BOOK_URL,
  //           {
  //             bookId: data.id,
  //             bookName: name,
  //             categories: categories,
  //           },
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${this.loggerService.token}`,
  //             },
  //           }
  //         )
  //         .subscribe();
  //     });
  // }

  //=================== CATEGORIES ==================

  getCategoriesNested$() {
    return this.apiService.get$(CAT_URL);
  }

  // getCategoriesNested() {
  //   return this.http
  //     .get(CAT_URL, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${this.loggerService.token}`,
  //       },
  //     })
  //     .subscribe((data: any) => (this.categories_nested = data));
  // }

  getCategoriesArray$() {
    return this.apiService.get$(CAT_FLAT_URL);
  }

  // getCategoriesArray() {
  //   return this.http
  //     .get(CAT_FLAT_URL, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${this.loggerService.token}`,
  //       },
  //     })
  //     .subscribe((data: any) => (this.categories = data));
  // }

  getCategory$() {
    return this.apiService.get$(CAT_URL);
  }
  // getCategory(id: number) {
  //   return this.http
  //     .get(CAT_URL + `/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${this.loggerService.token}`,
  //       },
  //     })
  //     .subscribe();
  // }

  deleteCategory$(id: number) {
    return this.apiService.delete$(CAT_URL + `/${id}`);
  }

  // deleteCategory(id: number) {
  //   this.http.delete(CAT_URL + `/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.loggerService.token}`,
  //     },
  //   });
  // }

  createCategory$(body: any) {
    this.apiService.post$(CAT_URL, body);
  }

  // createCategory(name: string, topCategory: string) {
  //   this.http
  //     .post(
  //       CAT_URL,
  //       {
  //         name,
  //         topCategory,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${this.loggerService.token}`,
  //         },
  //       }
  //     )
  //     .subscribe();
  // }

  //======================================================

  //======================= NOTES ========================

  getAllNotes$() {
    return this.apiService.get$(NOTES_URL);
  }

  // getAllNotes() {
  //   return this.http.get(NOTES_URL, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.loggerService.token}`,
  //     },
  //   });
  // }

  createNote$(body: any) {
    return this.apiService.post$(NOTES_URL, body);
  }

  // createNote(title: string, note: string, bookId: number) {
  //   return this.http
  //     .post(
  //       NOTES_URL,
  //       {
  //         bookId,
  //         title,
  //         note,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${this.loggerService.token}`,
  //         },
  //       }
  //     )
  //     .subscribe();
  // }

  //======================================================
}
