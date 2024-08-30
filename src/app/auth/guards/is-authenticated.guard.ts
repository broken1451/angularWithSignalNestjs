import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log ('isAuthenticatedGuard');
  console.log({route, state});
  

  console.log (authService.authStatus())
  if (authService.authStatus() == AuthStatus.authenticated) {
    return true;
  }

  // if (authService.authStatus() == AuthStatus.checking) {
  //   router.navigate(['/auth/layout/login']);
  //   return false;
  // }
  // const url = state.url;
  // localStorage.setItem('url', url);
  // console.log (localStorage.getItem('url'));

  router.navigate(['/auth/layout/login']);
  return true;
};
