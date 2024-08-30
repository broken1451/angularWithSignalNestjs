import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  console.log ('isNotAuthenticatedGuard');
  console.log({route, state});
  

  console.log (authService.authStatus())
  if (authService.authStatus() == AuthStatus.authenticated) {
    router.navigate(['/dashboard']);
    return false;
  }
  // router.navigate(['/auth/layout/login']);
  return true;
};
