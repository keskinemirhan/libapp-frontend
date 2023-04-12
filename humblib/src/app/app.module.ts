import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdbookComponent } from './adbook/adbook.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { CategorizationComponent } from './categorization/categorization.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesComponent } from './notes/notes.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { BooknotesComponent } from './booknotes/booknotes.component';
import { CoreModule } from './core/core.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { HumblibExceptionHandler, LoggerService } from './core';
import { LoginGuardService } from './core/guards';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    ListComponent,
    LoginComponent,
    AdbookComponent,
    UpdateBookComponent,
    CategorizationComponent,
    RegisterComponent,
    LibraryComponent,
    NotesComponent,
    AddnoteComponent,
    BooknotesComponent,
    NoteDetailComponent,
    NoteEditComponent,
  ],

  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
  providers: [
    LoginGuardService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: ErrorHandler,
      useClass: HumblibExceptionHandler,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: LoggerService) => async () =>
        await service.initLogin(),
      deps: [LoggerService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
