import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AdbookComponent } from './adbook/adbook.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { CategorizationComponent } from './categorization/categorization.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { NotesComponent } from './notes/notes.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { BooknotesComponent } from './booknotes/booknotes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  { path: '', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addbook', component: AdbookComponent },
  { path: 'updatebook/:id', component: UpdateBookComponent },
  { path: 'categorization', component: CategorizationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'addnote/:id', component: AddnoteComponent },
  { path: 'booknotes/:id', component: BooknotesComponent },
  { path: 'notedetail/:id', component: NoteDetailComponent },
  { path: 'notedit/:id', component: NoteEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
