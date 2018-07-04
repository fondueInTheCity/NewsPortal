import {Component, OnInit, OnDestroy} from '@angular/core';

import {FormBuilder} from '@angular/forms';
// import {Router} from '@angular/router';
import {UserService} from '../../service';
import {AlertService} from '../../auth/service';
import {User} from '../../models';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {first} from 'rxjs/internal/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user = new  User();
  viewMode = 'newsTab';
  isCanEdit: boolean;
  isDeleted: boolean;

  private routeSubscription: Subscription;

  constructor(
      private userService: UserService,
      private alertService: AlertService,
      private activatedRoute: ActivatedRoute
  ) {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      let username = params['username'];
      this.userService.getByUsername(username)
        .pipe(first())
        .subscribe((data: User) => {
            this.user = data;
            this.isDeleted = this.user.deleted;
            this.user.role = this.userService.transformRoleToView(this.user.role);

            let currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
            if ((currentUserJson.userRole === 'ROLE_ADMIN') || (this.user['username'] === currentUserJson.username))
              this.isCanEdit = true;
            else
              this.isCanEdit = false;
          },
          error => {
            this.alertService.error(error);
          });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routeSubscription && this.routeSubscription.unsubscribe();
  }

}
