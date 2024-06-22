import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAgregatorComponent } from './task-agregator.component';

describe('TaskAgregatorComponent', () => {
  let component: TaskAgregatorComponent;
  let fixture: ComponentFixture<TaskAgregatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAgregatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAgregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
