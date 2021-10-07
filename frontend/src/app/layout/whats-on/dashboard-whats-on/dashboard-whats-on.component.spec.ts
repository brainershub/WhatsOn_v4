import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWhatsOnComponent } from './dashboard-whats-on.component';

describe('DashboardWhatsOnComponent', () => {
  let component: DashboardWhatsOnComponent;
  let fixture: ComponentFixture<DashboardWhatsOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardWhatsOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWhatsOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
