import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class WriterGuard implements CanActivate {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser !== null) {
      if (this.currentUser.userRole === 'ROLE_WRITER' || this.currentUser.userRole === 'ROLE_ADMIN') {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
