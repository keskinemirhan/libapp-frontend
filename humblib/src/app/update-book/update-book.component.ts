import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  bookId: number = 0;
  form: FormGroup;
  book: any = null;
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
        if (item.value == e.target.value) {
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
    this.libraryService.getCategories();
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.libraryService.books.find((val) => val.id === this.bookId);
    //@ts-ignore
    this.form.get('name').setValue(this.book.name);
    for (let cat of this.book.categories) {
      (this.form.get('categories') as FormArray).push(
        new FormControl(cat.name)
      );
    }
  }
  onSubmit() {
    this.libraryService.patchBook(
      this.bookId,
      this.form.value.name,
      this.form.value.categories
    );
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigateByUrl('/list'));
  }
}
