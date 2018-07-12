import { Component, OnInit } from '@angular/core';
import {User} from '../../model';
import {UserService} from '../../service';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  idDelete: number;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(idUser: number) {
    this.userService.delete(idUser).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  setUserRole(role: string, userId: number) {
    role = this.userService.transformRoleToBackEnd(role);
    this.userService.setRole(userId, role).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  changeBlockUserStatus(userId: number, blocked: boolean) {
    this.userService.block(userId, !blocked).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      for (const user of users) {
        user.role = this.userService.transformRoleToView(user.role);
      }
    });
  }
}
