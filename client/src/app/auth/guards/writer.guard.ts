import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable()
export class WriterGuard implements CanActivate {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogin()) {
      if (this.authenticationService.isWriter() || this.authenticationService.isAdmin()) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
