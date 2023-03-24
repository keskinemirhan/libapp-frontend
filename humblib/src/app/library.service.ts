import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './var';

@Injectable()
export class LibraryService {
  constructor(private http: HttpClient) {}

  getBooks(id: number) {
    return this.http.get(BASE_URL + '/library/books');
  }

  getBook() {}

  patchBook() {}

  deleteBook() {}

  createBook() {}
}
