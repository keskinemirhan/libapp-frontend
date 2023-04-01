import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../core';

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
      name: [''],
    });
  }
  onSubmit() {
    this.libraryService.createCategory(this.form.value.name, '');
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigateByUrl('/categorization'));
  }

  getChildren(id: number) {
    this.libraryService.getCategory(id).unsubscribe();
  }
  ngOnInit() {
    this.libraryService.getCategoriesNested;
  }
}
