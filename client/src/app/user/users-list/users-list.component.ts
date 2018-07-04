import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../service/user.service';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  idDelete: number;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  setUserRole(role: string, userId: number) {
    role = this.userService.transformRoleToBackEnd(role);
    this.userService.setRole(userId, role).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  changeBlockUserStatus(id: number, blocked: boolean) {
    this.loading = true;
    this.userService.block(id, !blocked).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      for (let user of users){
        user.role = this.userService.transformRoleToView(user.role);
      }
      this.loading = false;
    });
  }
}
