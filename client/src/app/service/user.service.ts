import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from '../models';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

@Injectable()
export class UserService   {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.serverUrl}users`);
  }

  getById(id: number) {
    return this.http.get(`${environment.serverUrl}users` + '/' + id);
  }

  getByUsername(username: string) {
    return this.http.get(`${environment.serverUrl}users` + '/' + username);
  }

  addUser(user: User) {
    return this.http.post(`${environment.serverUrl}auth/registration`, user);
  }

  update(user: User) {
    return this.http.post(`${environment.serverUrl}users/edit`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.serverUrl}users` + '/' + id);
  }

  block(id: number, blocked: boolean) {
    return this.http.post(`${environment.serverUrl}users/block/` + id, { blocked });
  }

  getThemes() {
    return this.http.get(`${environment.serverUrl}users/getThemes`);
  }

  getLanguages() {
    return this.http.get(`${environment.serverUrl}users/getLanguages`);
  }

  transformRoleToView(role: string): string {
    let updatedRole = role.substring(5).toLocaleLowerCase();
    updatedRole = updatedRole.charAt(0).toUpperCase() + updatedRole.slice(1);
    return updatedRole;
  }

  transformRoleToBackEnd(role: string): string {
    let updatedRole = "ROLE_".concat(role.toUpperCase());
    return updatedRole;
  }

}
