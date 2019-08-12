import { TestBed } from '@angular/core/testing';

import { YardService } from './yard.service';

describe('YardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YardService = TestBed.get(YardService);
    expect(service).toBeTruthy();
  });
});
