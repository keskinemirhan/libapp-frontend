import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LibraryService } from '../core';
import { CreateCategory } from '../core/models';

@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.css'],
})
export class CategorizationComponent implements OnInit {
  form: FormGroup;
  loading: boolean = true;
  constructor(private fb: FormBuilder, public libraryService: LibraryService) {
    this.libraryService.loading.asObservable().subscribe((data: boolean) => {
      this.loading = data;
    });
    this.form = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      top: [0],
    });
  }
  categories: any = [];
  onSubmit() {
    if (!this.form.valid) return;
    const createCategory: CreateCategory = {
      name: this.form.value.name,
      topCategory: 0,
    };
    this.form.reset();
    this.libraryService.createCategory$(createCategory);
  }

  deleteCat(id: number) {
    this.libraryService.deleteCategory$(id);
  }

  ngOnInit() {
    this.libraryService.getCategoriesArray$();
    this.libraryService.categoriesState
      .asObservable()
      .subscribe((data: any) => (this.categories = data));
  }
}
