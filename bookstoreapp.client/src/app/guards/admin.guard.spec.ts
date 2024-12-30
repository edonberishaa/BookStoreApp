import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service'; // Mocked service

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isAdmin']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: spy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is admin', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should return false if user is not admin', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
  });
});
