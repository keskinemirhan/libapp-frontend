import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LibraryService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css'],
})
export class NoteEditComponent implements OnInit {
  form: FormGroup;
  noteId: number = 0;
  loading = true;
  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.libraryService.loading.asObservable().subscribe((data: boolean) => {
      this.loading = data;
    });

    this.form = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
      ]),
      note: new FormControl('', Validators.maxLength(1500)),
      id: new FormControl(0),
    });
  }
  ngOnInit(): void {
    this.noteId = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getNote$(this.noteId).subscribe((data: any) => {
      //@ts-ignore
      this.form.get('title').setValue(data.title);
      //@ts-ignore
      this.form.get('note').setValue(data.note);
      //@ts-ignore
      this.form.get('id').setValue(Number(data.id));

      this.libraryService.loading.next(false);
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.libraryService.updateNote(this.form.value);
    this.router.navigateByUrl('/notedetail/' + this.noteId);
  }
}
