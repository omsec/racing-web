import { TestBed } from '@angular/core/testing';

import { UserExistsValidatorService } from './user-exists-validator.service';

describe('UserExistsValidatorService', () => {
  let service: UserExistsValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserExistsValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
