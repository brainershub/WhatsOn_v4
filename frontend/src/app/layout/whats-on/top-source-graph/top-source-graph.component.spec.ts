import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSourceGraphComponent } from './top-source-graph.component';

describe('TopSourceGraphComponent', () => {
  let component: TopSourceGraphComponent;
  let fixture: ComponentFixture<TopSourceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSourceGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSourceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
