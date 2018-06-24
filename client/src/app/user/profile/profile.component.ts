import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
// import {Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {AlertService} from "../../_services/alert.service";
import {User} from "../../_models/user";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  // user: User[];
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let username = params['username'];
      this.userService.getByUsername(username)
        .pipe(first())
        .subscribe(
          data => {
            this.user = data;
            this.user["role"] = this.user["role"].substring(5);
          },
          error => {
            this.alertService.error(error);
          });
    });
  }

  ngOnInit() {

    // let currentUserJson = JSON.parse(localStorage.getItem("currentUser"));
    // currentUserJson.user.role = currentUserJson.user.role.substring(5);
    // this.user = currentUserJson.user;
  }

}
