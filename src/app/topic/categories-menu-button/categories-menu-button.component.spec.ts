import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenuButtonComponent } from './categories-menu-button.component';

describe('CategoriesMenuButtonComponent', () => {
  let component: CategoriesMenuButtonComponent;
  let fixture: ComponentFixture<CategoriesMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMenuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
