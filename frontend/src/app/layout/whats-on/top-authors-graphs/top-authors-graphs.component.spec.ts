import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAuthorsGraphsComponent } from './top-authors-graphs.component';

describe('TopAuthorsGraphsComponent', () => {
  let component: TopAuthorsGraphsComponent;
  let fixture: ComponentFixture<TopAuthorsGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAuthorsGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAuthorsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
