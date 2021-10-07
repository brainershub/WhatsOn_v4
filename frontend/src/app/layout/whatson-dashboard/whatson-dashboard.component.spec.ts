import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsonDashboardComponent } from './whatson-dashboard.component';

describe('WhatsonDashboardComponent', () => {
  let component: WhatsonDashboardComponent;
  let fixture: ComponentFixture<WhatsonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsonDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
