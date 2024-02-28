import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const logedUserGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  if (_AuthService.userIsLogedIn.value) {
    return false;
  } else {
    return true;
  }
};
