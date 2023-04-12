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
import { LoginGuardService } from './core/guards';
import { inject } from '@angular/core';
const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: '',
    component: MenuComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'addbook',
    component: AdbookComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'updatebook/:id',
    component: UpdateBookComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'categorization',
    component: CategorizationComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'addnote/:id',
    component: AddnoteComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'booknotes/:id',
    component: BooknotesComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'notedetail/:id',
    component: NoteDetailComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
  {
    path: 'notedit/:id',
    component: NoteEditComponent,
    canActivate: [() => inject(LoginGuardService).canActivate()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
