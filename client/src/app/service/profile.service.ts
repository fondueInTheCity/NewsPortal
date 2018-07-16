import { Injectable } from '@angular/core';
import {UserEditDto} from '../dto';
import {first} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: UserEditDto;
  isDeleted: boolean;
  role: String;
  constructor(private userService: UserService) {}
  getUser(): UserEditDto {
    return this.user;
  }
  setProfileByUsername(username: string) {
    this.userService.getByUsername(username)
      .pipe(first())
      .subscribe((userEditDto: UserEditDto) => {
          this.user = userEditDto;
          this.isDeleted = this.user.deleted;
          this.role = this.userService.transformRoleToView(this.user.role);
        });
  }
}
