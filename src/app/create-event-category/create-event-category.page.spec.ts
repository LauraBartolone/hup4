import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventCategoryPage } from './create-event-category.page';

describe('CreateEventCategoryPage', () => {
  let component: CreateEventCategoryPage;
  let fixture: ComponentFixture<CreateEventCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
