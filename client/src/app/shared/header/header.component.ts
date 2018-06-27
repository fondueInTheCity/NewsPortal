import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../auth/service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {

    this.authenticationService.loggedIn.subscribe( value => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
