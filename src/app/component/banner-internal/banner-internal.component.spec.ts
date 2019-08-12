import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInternalComponent } from './banner-internal.component';

describe('BannerInternalComponent', () => {
  let component: BannerInternalComponent;
  let fixture: ComponentFixture<BannerInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
