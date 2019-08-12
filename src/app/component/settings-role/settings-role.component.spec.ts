import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsRoleComponent } from './settings-role.component';

describe('SettingsRoleComponent', () => {
  let component: SettingsRoleComponent;
  let fixture: ComponentFixture<SettingsRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
