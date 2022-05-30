import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpanPickerComponent } from './time-span-picker.component';

describe('TimeSpanPickerComponent', () => {
  let component: TimeSpanPickerComponent;
  let fixture: ComponentFixture<TimeSpanPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSpanPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSpanPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
