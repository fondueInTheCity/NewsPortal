import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogin()) {
      if (this.authenticationService.isAdmin()) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
