import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCompanyComponent } from './settings-company.component';

describe('SettingsCompanyComponent', () => {
  let component: SettingsCompanyComponent;
  let fixture: ComponentFixture<SettingsCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
