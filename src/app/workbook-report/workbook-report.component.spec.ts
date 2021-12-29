import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookReportComponent } from './workbook-report.component';

describe('WorkbookReportComponent', () => {
  let component: WorkbookReportComponent;
  let fixture: ComponentFixture<WorkbookReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkbookReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
