import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDetailsComponent } from './feed-details.component';

describe('FeedDetailsComponent', () => {
  let component: FeedDetailsComponent;
  let fixture: ComponentFixture<FeedDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedDetailsComponent]
    });
    fixture = TestBed.createComponent(FeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
