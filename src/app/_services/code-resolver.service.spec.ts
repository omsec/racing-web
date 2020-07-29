import { TestBed } from '@angular/core/testing';

import { CodeResolverService } from './code-resolver.service';

describe('CodeResolverService', () => {
  let service: CodeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
