import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LibraryService {
  constructor(private http: HttpClient) {}

  getBooks(id: number) {
    return this.http.get();
  }

  getBook() {}

  patchBook() {}

  deleteBook() {}

  createBook() {}
}
