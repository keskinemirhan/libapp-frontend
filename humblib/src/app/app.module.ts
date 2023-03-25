import { NgModule } from '@angular/core';
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
import { LoggerService } from './logger.service';
import { LibraryService } from './library.service';
import { AdbookComponent } from './adbook/adbook.component';

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
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [LoggerService, LibraryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
