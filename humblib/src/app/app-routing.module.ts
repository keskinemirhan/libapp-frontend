import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AdbookComponent } from './adbook/adbook.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { CategorizationComponent } from './categorization/categorization.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
