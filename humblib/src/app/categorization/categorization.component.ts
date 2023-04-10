import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../core';
import { CreateCategory } from '../core/models';

@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.css'],
})
export class CategorizationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public libraryService: LibraryService
  ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      top: new FormControl('', Validators.required),
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

  ngOnInit() {
    this.libraryService.getCategoriesArray$();
    this.libraryService.categoriesState
      .asObservable()
      .subscribe((data: any) => (this.categories = data));
  }
}
