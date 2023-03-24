import { Component } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  constructor(public libraryService: LibraryService) {}
}
