import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStatusComponent } from './settings-status.component';

describe('SettingsStatusComponent', () => {
  let component: SettingsStatusComponent;
  let fixture: ComponentFixture<SettingsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
