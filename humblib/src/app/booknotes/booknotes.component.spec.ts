import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooknotesComponent } from './booknotes.component';

describe('BooknotesComponent', () => {
  let component: BooknotesComponent;
  let fixture: ComponentFixture<BooknotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooknotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooknotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
