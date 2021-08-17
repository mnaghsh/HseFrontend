import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistQuestionsComponent } from './checklist-questions.component';

describe('ChecklistQuestionsComponent', () => {
  let component: ChecklistQuestionsComponent;
  let fixture: ComponentFixture<ChecklistQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
