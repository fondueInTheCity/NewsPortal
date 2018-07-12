import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../auth/service/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import * as $ from "jquery";
import {first} from "rxjs/internal/operators";
import {UserService} from "../../service/user.service";
import {AlertService} from "../../auth/service/alert.service";
import {Language} from "../../model/language";
import {Theme} from "../../model/theme";
import {ProfileService} from '../../service';
import {UserEditDto} from '../../dto/UserEditDto';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;
  themes: any;
  languages: any;

  private themesSubscription: Subscription;
  private languagesSubscription: Subscription;

  userValidate(){
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUserJSON != undefined) && (currentUserJSON != null) && (currentUserJSON.userRole == "ROLE_ADMIN")){
      this.isAdmin = true;
    }
    else
      this.isAdmin = false;
    this.currentUser = currentUserJSON;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private userService: UserService,
    private alertService: AlertService,
    private profileService: ProfileService) {
    this.authenticationService.loggedIn.subscribe( value => {
      this.userValidate();
    });
    this.themesSubscription = this.userService.getThemes()
      .pipe(first())
      .subscribe(
        data => {
          this.themes = data;
        },
        error => {
          this.alertService.error(error);
        });

    this.languagesSubscription = this.userService.getLanguages()
      .pipe(first())
      .subscribe(
        data => {
          this.languages = data;
        },
        error => {
          this.alertService.error(error);
        });
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUserJSON === null)
      translate.setDefaultLang('en');
    else
      translate.setDefaultLang(currentUserJSON.language);
  }

  switchTheme(theme: Theme) {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUserJSON !== null) && (currentUserJSON.username !== null)) {
      this.themesSubscription = this.userService.setTheme(currentUserJSON.username, theme)
        .pipe(first())
        .subscribe(
          data => {
            currentUserJSON.theme = theme.name;
            localStorage.setItem('currentUser', JSON.stringify(currentUserJSON));
            this.setDomTheme(theme.name);
          },
          (error: string) => {
            this.alertService.error(error);
          });
    }
    else{
      this.setDomTheme(theme.name);
    }
  }

  setDomTheme(theme: string){
    let themeElem = document.getElementsByName("themeElem")[0];
    let themeClass = themeElem.classList[0];
    themeElem.classList.remove(themeClass);
    themeElem.classList.add("theme-" + theme.toLowerCase());
  }

  switchLanguage(language: Language) {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUserJSON !== null) && (currentUserJSON.username !== null)) {
      this.languagesSubscription = this.userService.setLanguage(currentUserJSON.username, language)
        .pipe(first())
        .subscribe(
          data => {
            currentUserJSON.language = language.name;
            localStorage.setItem('currentUser', JSON.stringify(currentUserJSON));
          },
          (error: string) => {
            this.alertService.error(error);
          });
    }
    this.translate.use(language.name);
  }

  ngOnInit() {
    this.userValidate();
  }

  ngOnDestroy(): void {
    this.themesSubscription && this.themesSubscription.unsubscribe();
    this.languagesSubscription && this.languagesSubscription.unsubscribe();
  }
  clearProfile() {
    this.profileService.setUser(new UserEditDto());
  }
}
