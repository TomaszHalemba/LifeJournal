import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderEntryListComponent } from './reminder-entry-list.component';

describe('ReminderEntryListComponent', () => {
  let component: ReminderEntryListComponent;
  let fixture: ComponentFixture<ReminderEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderEntryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
