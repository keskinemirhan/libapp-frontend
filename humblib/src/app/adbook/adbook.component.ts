import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../core';
import { CreateBook } from '../core/models';

@Component({
  selector: 'app-adbook',
  templateUrl: './adbook.component.html',
  styleUrls: ['./adbook.component.css'],
})
export class AdbookComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    public libraryService: LibraryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      categories: this.fb.array([]),
    });
  }

  categories: any = [];
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

  ngOnInit(): void {
    this.libraryService.getCategoriesArray$();
    this.libraryService.categoriesState
      .asObservable()
      .subscribe((data: any) => (this.categories = data));
  }
  onSubmit() {
    const createBook: CreateBook = {
      name: this.form.value.name,
      categories: this.form.value.categories,
    };
    this.libraryService.createBook$(createBook);
    this.router.navigateByUrl('/list');
  }
}
