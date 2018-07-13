import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, Language, Theme } from '../model';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {UserEditDto} from '../dto';

@Injectable()
export class UserService   {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.serverUrl}users`);
  }

  getByUsername(username: string) {
    return this.http.get<UserEditDto>(`${environment.serverUrl}users/` + username);
  }

  addUser(user: User) {
    return this.http.post(`${environment.serverUrl}auth/registration`, user);
  }

  update(user: UserEditDto) {
    return this.http.post(`${environment.serverUrl}users/edit`, user);
  }

  uploadImage(image: FormData, id: number) {
    return this.http.post(`${environment.serverUrl}users/editImage/` + id, image);
  }

  delete(id: number) {
    return this.http.delete(`${environment.serverUrl}users/` + id);
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

  setLanguage(username: string, language: Language) {
    return this.http.post(`${environment.serverUrl}users/setUserLanguage/` + username, language);
  }

  setTheme(username: string, theme: Theme) {
    return this.http.post(`${environment.serverUrl}users/setUserTheme/` + username, theme);
  }

  setRole(userId: number, role: String) {
    return this.http.post(`${environment.serverUrl}users/setUserRole/` + userId, role);
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

  getImage(username: string) {
    return this.http.get<string>(`${environment.serverUrl}users/getImage/` + username, {responseType: 'text'});
  }
}
