import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateNote } from '../core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css'],
})
export class AddnoteComponent implements OnInit {
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      title: [''],
      note: [''],
    });
  }
  bookId: number = 0;
  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
  }
  onSubmit() {
    const createNote: CreateNote = {
      title: this.form.value.title,
      note: this.form.value.note,
      bookId: this.bookId,
    };
    this.libraryService.createNote$(createNote);
    this.router.navigateByUrl('/booknotes' + `/${this.bookId}`);
  }
}
