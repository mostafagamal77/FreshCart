import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _router = inject(Router);
  if (_AuthService.userIsLogedIn.value) {
    return true;
  } else {
    _router.navigate(['/auth']);
    return false;
  }
};
