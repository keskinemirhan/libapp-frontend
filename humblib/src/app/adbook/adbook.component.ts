import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';

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

  ngOnInit(): void {
    this.libraryService.getCategories();
  }
  onSubmit() {
    this.libraryService.createBook(
      this.form.value.name,
      this.form.value.categories
    );
    setTimeout(() => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigateByUrl('/list'));
    }, 100);
  }
}
