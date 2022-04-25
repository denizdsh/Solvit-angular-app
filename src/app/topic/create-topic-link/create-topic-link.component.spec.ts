import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicLinkComponent } from './create-topic-link.component';

describe('CreateTopicLinkComponent', () => {
  let component: CreateTopicLinkComponent;
  let fixture: ComponentFixture<CreateTopicLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTopicLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTopicLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
