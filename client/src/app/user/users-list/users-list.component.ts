import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user";
import {UserService} from "../../_services/user.service";
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: number){
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
}
