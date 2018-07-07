import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import {first} from "rxjs/internal/operators";
import {User} from "../../model/user";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class AuthenticationService  {
    constructor(private http: HttpClient, private router: Router, private translate: TranslateService) { }

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
                    console.log('error');
                });
        return this.http.post<any>(`${environment.serverUrl}auth/login`,
            { username: username, password: password })
            .pipe(map((res: any) => {
                if (res && res.token) {
                    this.translate.use(user.language.name);
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token, userRole, language: user.language.name }));
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
}
