import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNewLayoutComponent } from './default-new-layout.component';

describe('DefaultNewLayoutComponent', () => {
  let component: DefaultNewLayoutComponent;
  let fixture: ComponentFixture<DefaultNewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultNewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
