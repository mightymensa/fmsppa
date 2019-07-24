import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmHistoryPage } from './alarm-history.page';

describe('AlarmHistoryPage', () => {
  let component: AlarmHistoryPage;
  let fixture: ComponentFixture<AlarmHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
