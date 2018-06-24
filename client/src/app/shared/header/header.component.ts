import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user";
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;

  userValidate(){
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUserJSON != undefined) && (currentUserJSON != null) && (currentUserJSON.user.role == "ROLE_ADMIN")){
      this.isAdmin = true;
    }
    else
      this.isAdmin = false;
    this.currentUser = currentUserJSON;
  }

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.loggedIn.subscribe( value => {
      this.userValidate();
    });
  }

  ngOnInit() {
    this.userValidate();
  }


}
