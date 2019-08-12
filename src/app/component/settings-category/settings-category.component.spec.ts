import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoryComponent } from './settings-category.component';

describe('SettingsCategoryComponent', () => {
  let component: SettingsCategoryComponent;
  let fixture: ComponentFixture<SettingsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
