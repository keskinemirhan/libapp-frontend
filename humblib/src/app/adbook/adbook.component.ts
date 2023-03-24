import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-adbook',
  templateUrl: './adbook.component.html',
  styleUrls: ['./adbook.component.css'],
})
export class AdbookComponent implements OnInit {
  constructor(public libraryService: LibraryService) {}
  ngOnInit(): void {
    this.libraryService.getCategories();
  }
}
