import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAsideComponent } from './sort-aside.component';

describe('SortAsideComponent', () => {
  let component: SortAsideComponent;
  let fixture: ComponentFixture<SortAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
