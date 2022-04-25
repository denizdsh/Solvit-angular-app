import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPostsMessageComponent } from './no-posts-message.component';

describe('NoPostsMessageComponent', () => {
  let component: NoPostsMessageComponent;
  let fixture: ComponentFixture<NoPostsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPostsMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPostsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
