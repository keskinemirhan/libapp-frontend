import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { LibraryService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceivedBookModel, UpdateBook } from '../core/models';
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
  loaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public libraryService: LibraryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
      ]),
      categories: this.fb.array([]),
    });
  }

  onCheckboxChange(e: any) {
    const categories: FormArray = this.form.get('categories') as FormArray;
    if (e.checked) {
      categories.push(new FormControl(parseInt(e.source.value)));
    } else {
      let i: number = 0;
      categories.controls.forEach((item: any) => {
        if (item.value == parseInt(e.source.value)) {
          categories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  isCat(cat: any) {
    return this.book.categories.some((e: any) => e.id == cat.id);
  }

  ngOnInit(): void {
    this.libraryService.getCategoriesArray$();
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getBooks$();
    this.libraryService.booksState
      .asObservable()
      .subscribe((data: ReceivedBookModel[]) => {
        if (!this.loaded && data.length > 0) {
          this.loaded = true;
          this.book = data.find((val) => val.id === this.bookId);
          //@ts-ignore
          this.form.get('name').setValue(this.book.name);

          for (let cat of this.book.categories) {
            (this.form.get('categories') as FormArray).push(
              new FormControl(cat.id)
            );
          }
        }
      });
  }
  onSubmit() {
    const updateBook: UpdateBook = {
      bookId: this.bookId,
      bookName: this.form.value.name,
      categories: this.form.value.categories,
    };
    this.libraryService.patchBook$(updateBook);
    this.router.navigateByUrl('/list');
    this.form.reset();
  }
}
