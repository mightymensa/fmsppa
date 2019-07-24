import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneviewPage } from './zoneview.page';

describe('ZoneviewPage', () => {
  let component: ZoneviewPage;
  let fixture: ComponentFixture<ZoneviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
