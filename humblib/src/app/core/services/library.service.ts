import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { BOOK_URL, CAT_FLAT_URL, CAT_URL, NOTES_URL } from './var';
import { ApiService } from './api.service';
import {
  CreateBook,
  CreateCategory,
  CreateNote,
  ReceivedBookModel,
  ReceivedCategoryModel,
  ReceivedNoteModel,
  UpdateBook,
  UpdateNote,
} from '../models';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  constructor(private apiService: ApiService) {}
  booksState = new BehaviorSubject<Array<ReceivedBookModel>>([]);
  categoriesNestedState = new BehaviorSubject<ReceivedCategoryModel>({});
  categoriesState = new BehaviorSubject<Array<ReceivedCategoryModel>>([]);
  notesState = new BehaviorSubject<Array<ReceivedNoteModel>>([]);
  loading = new BehaviorSubject<boolean>(false);

  flushStates() {
    this.booksState.next([]);
    this.categoriesNestedState.next({});
    this.categoriesState.next([]);
    this.notesState.next([]);
  }

  //=================== BOOKS ==================

  getBooks$() {
    this.loading.next(true);
    this.apiService.get$(BOOK_URL).subscribe({
      next: (data: any) => {
        this.booksState.next(data);
        this.loading.next(false);
      },
      complete: () => this.loading.next(false),
    });
  }

  getBook$(id: number) {
    this.loading.next(true);
    return this.apiService.get$(BOOK_URL + `/${id}`).pipe(last());
  }

  patchBook$(body: UpdateBook) {
    this.loading.next(true);
    this.apiService.patch$(BOOK_URL, body).subscribe(() => this.getBooks$());
  }

  deleteBook$(id: number) {
    this.loading.next(true);
    this.apiService
      .delete$(BOOK_URL + `/${id}`)
      .subscribe(() => this.getBooks$());
  }

  //temporary implementation
  createBook$(body: CreateBook) {
    this.loading.next(true);

    this.apiService
      .post$(BOOK_URL, body)

      .subscribe(() => this.getBooks$());
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
    this.loading.next(true);

    this.apiService.get$(CAT_URL).subscribe((data: any) => {
      this.categoriesNestedState.next(data);
      this.loading.next(false);
    });
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
    this.loading.next(true);

    this.apiService.get$(CAT_FLAT_URL).subscribe((data: any) => {
      this.categoriesState.next(data);
      this.loading.next(false);
    });
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

  // getCategory$() {
  //   return this.apiService.get$(CAT_URL).subscribe((data :  );
  // }

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
    this.loading.next(true);
    this.apiService.delete$(CAT_URL + `/${id}`).subscribe((data: any) => {
      this.getCategoriesArray$();
      this.getCategoriesNested$();
    });
  }

  // deleteCategory(id: number) {
  //   this.http.delete(CAT_URL + `/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.loggerService.token}`,
  //     },
  //   });
  // }

  createCategory$(body: CreateCategory) {
    this.loading.next(true);
    this.apiService.post$(CAT_URL, body).subscribe((data: any) => {
      this.getCategoriesNested$();
      this.getCategoriesArray$();
    });
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
    this.loading.next(true);
    this.apiService.get$(NOTES_URL).subscribe((data: any) => {
      this.notesState.next(data);
      this.loading.next(false);
    });
  }

  // getAllNotes() {
  //   return this.http.get(NOTES_URL, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.loggerService.token}`,
  //     },
  //   });
  // }

  getNotesByBook$(id: number) {
    this.loading.next(true);
    return this.apiService.get$(NOTES_URL + '/book' + `/${id}`).pipe(last());
  }

  getNote$(id: number) {
    this.loading.next(true);
    return this.apiService.get$(NOTES_URL + `/${id}`).pipe(last());
  }

  createNote$(body: CreateNote) {
    this.loading.next(true);
    this.apiService.post$(NOTES_URL, body).subscribe(() => this.getAllNotes$());
  }

  updateNote(body: UpdateNote) {
    this.loading.next(true);
    this.apiService
      .patch$(NOTES_URL, body)
      .subscribe(() => this.getAllNotes$());
  }

  deleteNote(id: number) {
    this.loading.next(true);
    this.apiService
      .delete$(NOTES_URL + `/${id}`)
      .subscribe(() => this.getAllNotes$());
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
