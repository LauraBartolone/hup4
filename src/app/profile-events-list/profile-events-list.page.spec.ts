import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventsListPage } from './profile-events-list.page';

describe('ProfileEventsListPage', () => {
  let component: ProfileEventsListPage;
  let fixture: ComponentFixture<ProfileEventsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEventsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEventsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
