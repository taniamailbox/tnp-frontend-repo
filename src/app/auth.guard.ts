import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  var userData = localStorage.getItem('userToken');
  const router = inject(Router);
  if (!userData) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
