import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { LibraryService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateBook } from '../core/models';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  bookId: number = 0;
  form: FormGroup;
  book: any = null;
  categories: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public libraryService: LibraryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      categories: this.fb.array([]),
    });
  }

  onCheckboxChange(e: any) {
    const categories: FormArray = this.form.get('categories') as FormArray;
    if (e.target.checked) {
      categories.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      categories.controls.forEach((item: any) => {
        if (item.value == parseInt(e.target.value)) {
          categories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  isCat(cat: any) {
    return this.book.categories.some((e: any) => e.name === cat.name);
  }

  ngOnInit(): void {
    this.libraryService.getCategoriesArray$();
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getBooks$();
    this.libraryService.booksState.asObservable().subscribe((data: any[]) => {
      if (data) {
        this.book = data.find((val) => val.bookId == this.bookId);
        //@ts-ignore
        this.form.get('name').setValue(this.book.name);
        for (let cat of this.book.categories) {
          (this.form.get('categories') as FormArray).push(
            new FormControl(cat.name)
          );
        }
      }
    });
  }
  onSubmit() {
    const updateBook: UpdateBook = {
      bookId: this.bookId,
      name: this.form.value.name,
      categories: this.form.value.categories,
    };
    this.libraryService.patchBook$(updateBook);
  }
}
