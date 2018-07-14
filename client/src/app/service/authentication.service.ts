import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import {first} from 'rxjs/internal/operators';
import {User} from '../model';
import {TranslateService} from '@ngx-translate/core';
import {LoginResponseDto, LoginRequestDto} from '../dto';
import {InfoService} from './index';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,
                private router: Router,
                private translate: TranslateService,
                private infoService: InfoService) { }

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
        return this.http.post<LoginResponseDto>(`${environment.serverUrl}auth/login`, new LoginRequestDto(username, password))
            .pipe(map((res: LoginResponseDto) => {
                this.infoService.alertInformation(res.errorDto.error, res.errorDto.message);
                if (res && res.token) {
                    this.translate.use(user.language.name);
                  this.setDomTheme(user.theme.name);
                    localStorage.setItem('currentUser', JSON.stringify({ id: user.id, username, token: res.token, userRole,
                      language: user.language.name, theme: user.theme.name }));
                    this.loggedIn.next(true);
                  this.router.navigate(['/']);
                }
            }));
    }

    setDomTheme(theme: string){
      let themeElem = document.getElementsByName("themeElem")[0];
      let themeClass = themeElem.classList[0];
      themeElem.classList.remove(themeClass);
      themeElem.classList.add("theme-" + theme.toLowerCase());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
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

    isLogin(): boolean {
      return JSON.parse(localStorage.getItem('currentUser')) !== null;
    }

    isAdmin(): boolean {
      return this.isLogin() ? JSON.parse(localStorage.getItem('currentUser')).userRole === 'ROLE_ADMIN' : false;
    }

    isWriter(): boolean {
      return this.isLogin() ? JSON.parse(localStorage.getItem('currentUser')).userRole === 'ROLE_WRITER' : false;
    }

    getCurrentUsername(): string {
      if (this.isLogin()) {
        return JSON.parse(localStorage.getItem('currentUser')).username;
      }
    }

    isCurrentUser(username: string): boolean {
      return this.getCurrentUsername() === username;
    }

    isCanEdit(username: string): boolean {
      return this.isAdmin() || this.isCurrentUser(username);
    }

    isCanAddNews(username: string): boolean {
      return this.isAdmin() || (this.isCurrentUser(username) && this.isWriter())
    }

}
