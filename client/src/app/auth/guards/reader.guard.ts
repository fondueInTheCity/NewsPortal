import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable()
export class ReaderGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
