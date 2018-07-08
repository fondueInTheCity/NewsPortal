import { Injectable } from '@angular/core';
import {UserEditDto} from '../dto/userEditDto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: UserEditDto;
  constructor() {}
  setUser(user: UserEditDto) {
    this.user = user;
  }
  getUser(): UserEditDto {
    return this.user;
  }
}
