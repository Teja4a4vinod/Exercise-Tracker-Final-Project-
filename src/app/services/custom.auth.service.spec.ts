import { TestBed, inject } from '@angular/core/testing';

import { CustomAuthService } from './custom.auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomAuthService]
    });
  });

  it('should be created', inject([CustomAuthService], (service: CustomAuthService) => {
    expect(service).toBeTruthy();
  }));
});
