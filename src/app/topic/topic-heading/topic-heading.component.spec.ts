import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHeadingComponent } from './topic-heading.component';

describe('TopicHeadingComponent', () => {
  let component: TopicHeadingComponent;
  let fixture: ComponentFixture<TopicHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
