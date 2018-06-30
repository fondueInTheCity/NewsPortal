import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import {first} from 'rxjs/internal/operators';
import {User} from '../../models/user';


@Injectable()
export class AuthenticationService  {
    constructor(private http: HttpClient, private router: Router) { }

    public loggedIn = new BehaviorSubject<boolean>(false);

    login(username: string, password: string) {
        let user, userRole;
        this.http.get(`${environment.serverUrl}users` + '/' + username)
        .pipe(first())
            .subscribe((data: User) => {
                    user = data;
                    userRole = data.role;
                },
                error => {
                    console.log("error");
                });
        return this.http.post<any>(`${environment.serverUrl}auth/login`,
            { username: username, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token, userRole }));
                    this.loggedIn.next(true);
                }
            }));
    }
    // login(username: string, password: string) {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   retun
    // }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
    }
    activate(code: string) {
      return this.http.get(`${environment.serverUrl}auth/activate/` + code);
    }
    sendCodeNewPassword(email: string) {
      return this.http.post(`${environment.serverUrl}auth/sendCodeNewPassword`, email);
    }
    sendNewPassword(code: string, password: string) {
      return this.http.post(`${environment.serverUrl}auth/changeNewPassword/` + code, password);
    }

    // confirmNewPassword(code: string, password: string) {
  //     //   return this.http.post(`${environment.serverUrl}newPassword` + '/' + code, password);
  //     // }
  //     // confirmNewPassword(code: string, password: string) {
  //     //   return this.http.post(`${environment.serverUrl}newPassword` + '/' + code, password);
  //     // }
}
