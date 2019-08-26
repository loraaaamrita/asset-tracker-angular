import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDeployComponent } from './asset-deploy.component';

describe('AssetDeployComponent', () => {
  let component: AssetDeployComponent;
  let fixture: ComponentFixture<AssetDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
