import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-profile-news',
  templateUrl: 'profile-news.component.html',
  styleUrls: ['profile-news.component.css']
})
export class ProfileNewsComponent implements OnInit {
  @Input() user: any;
  constructor(
      private userService: UserService) { }

  ngOnInit() {
  }

  isCanAddNews(): boolean{
    let currentUserJson = JSON.parse(localStorage.getItem("currentUser"));
    let isSelfAddNews: boolean = (((currentUserJson.userRole === "ROLE_ADMIN") ||
    (currentUserJson.userRole === "ROLE_WRITER")) && (this.user["username"] === currentUserJson.username));
    let isAdminPostsByOthers: boolean = ((currentUserJson.userRole === "ROLE_ADMIN") &&
    (this.user["role"] === "Writer"));
    if (isSelfAddNews || isAdminPostsByOthers)
      return true;
    else
      return false;
  }
}
