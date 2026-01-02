import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGeneral } from './dashboard-general';

describe('DashboardGeneral', () => {
  let component: DashboardGeneral;
  let fixture: ComponentFixture<DashboardGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGeneral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
