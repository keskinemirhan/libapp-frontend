import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';
import {
  ReceivedBookModel,
  ReceivedCategoryModel,
  ReceivedNoteModel,
} from '../core/models';
import { BehaviorSubject, filter } from 'rxjs';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  constructor(public libraryService: LibraryService) {}

  categories: any = [];
  books: ReceivedBookModel[] = [];
  notes: ReceivedNoteModel[] = [];
  filterCats = new BehaviorSubject<number[]>([]);
  filteredBooks = new BehaviorSubject<Set<ReceivedBookModel>>(new Set());
  filtered = false;
  allSelected = new BehaviorSubject<boolean>(true);
  allSelectedResponse = true;

  isCat(book: any, cat: any) {
    return book.categories.some((e: any) => e.name === cat.name);
  }

  getNotesCount(id: any) {
    return this.notes.filter((data: ReceivedNoteModel) => data.book.id === id)
      .length;
  }

  selectCategory(data: MatChipSelectionChange) {
    if (data.selected) {
      this.filterCats.getValue().push(data.source.value.id as never);
    } else {
      this.filterCats
        .getValue()
        .splice(
          this.filterCats.getValue().indexOf(data.source.value.id as never),
          1
        );
    }
    this.filterCats.next(this.filterCats.getValue());
  }

  catControl(book: ReceivedBookModel) {
    const categories = book.categories?.map((data: any) => data.id);
    //@ts-ignore
    const result = categories?.some((data: any) =>
      this.filterCats.getValue().includes(data)
    );

    return result;
  }

  clearFilter(data: MatChipSelectionChange) {
    this.allSelected.next(data.selected);
    this.filterBooksByCat();
  }

  filterBooksByCat() {
    const filtered = new Set<ReceivedBookModel>();
    if (this.filterCats.getValue().length && !this.allSelected.getValue()) {
      this.books.forEach((book: ReceivedBookModel) => {
        if (this.catControl(book)) {
          filtered.add(book);
        }
      });
    } else {
      this.books.forEach((book: ReceivedBookModel) => {
        filtered.add(book);
      });
    }

    this.filteredBooks.next(filtered);
  }

  ngOnInit(): void {
    this.libraryService.getCategoriesArray$();
    this.libraryService.getBooks$();
    this.libraryService.getAllNotes$();
    this.libraryService.categoriesState
      .asObservable()
      .subscribe((data: ReceivedCategoryModel[]) => (this.categories = data));
    this.libraryService.booksState
      .asObservable()
      .subscribe((data: ReceivedBookModel[]) => {
        this.books = data;

        this.filterCats.asObservable().subscribe(() => {
          this.filterBooksByCat();
        });
      });
    this.libraryService.notesState.subscribe(
      (data: any) => (this.notes = data)
    );
  }
}
