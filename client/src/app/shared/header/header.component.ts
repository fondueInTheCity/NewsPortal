import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {AuthenticationService} from "../../auth/service/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import * as $ from "jquery";
import {first} from "rxjs/internal/operators";
import {UserService} from "../../service/user.service";
import {AlertService} from "../../auth/service/alert.service";
import {Language} from "../../models/language";
import {Theme} from "../../models/theme";

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
    private alertService: AlertService) {
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
          (error: string) => {
            this.alertService.error(error);
          });
    }
  }

  switchLanguage(language: Language) {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUserJSON !== null) && (currentUserJSON.username !== null)) {
      this.languagesSubscription = this.userService.setLanguage(currentUserJSON.username, language)
        .pipe(first())
        .subscribe(
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
}
