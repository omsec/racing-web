import { TestBed } from '@angular/core/testing';

import { VerifyPasswordValidatorService } from './verify-password-validator.service';

describe('VerifyPasswordValidatorService', () => {
  let service: VerifyPasswordValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyPasswordValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
