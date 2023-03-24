import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdbookComponent } from './adbook.component';

describe('AdbookComponent', () => {
  let component: AdbookComponent;
  let fixture: ComponentFixture<AdbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
