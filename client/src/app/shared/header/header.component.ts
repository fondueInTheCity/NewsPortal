import { Component, OnInit } from '@angular/core';
import { Language, Theme} from '../../model';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {first} from 'rxjs/internal/operators';
import {UserService, ProfileService} from '../../service';
import {AlertService, AuthenticationService} from '../../auth/service';
import {UserEditDto} from '../../dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  // currentUser: User;
  themes: any;
  languages: any;

  private themesSubscription: Subscription;
  private languagesSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private profileService: ProfileService) {
    // this.authenticationService.loggedIn.subscribe( value => {
    //   // this.userValidate();
    // });
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
    const currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUserJSON === null) {
      translate.setDefaultLang('en');
    } else {
      translate.setDefaultLang(currentUserJSON.language);
    }
  }

  ngOnInit() {
    // this.userValidate();
  }

  // userValidate() {
  //   let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
  //   // if ((currentUserJSON != undefined) && (currentUserJSON != null) && (currentUserJSON.userRole == "ROLE_ADMIN")){
  //   //   this.isAdmin = true;
  //   // }
  //   // else
  //   //   this.isAdmin = false;
  //   this.currentUser = currentUserJSON;
  // }

  switchTheme(theme: Theme) {
    const currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
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
    } else {
      this.setDomTheme(theme.name);
    }
  }

  setDomTheme(theme: string) {
    const themeElem = document.getElementsByName('themeElem')[0];
    const themeClass = themeElem.classList[0];
    themeElem.classList.remove(themeClass);
    themeElem.classList.add('theme-' + theme.toLowerCase());
  }

  switchLanguage(language: Language) {
    const currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
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

  search($event) {
    const searchText = $event.target.value;
    this.router.navigate(['/'], { queryParams: { search: searchText } } );
  }

  clearProfile() {
    this.profileService.setUser(new UserEditDto());
  }

  isLogin(): boolean {
    return this.authenticationService.isLogin();
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  currentUsername(): string {
    return this.authenticationService.getCurrentUsername();
  }

  // setProfile(username: string) {
  //   this.profileService.setProfileByUsername(username);
  // }

  ngOnDestroy(): void {
    this.themesSubscription && this.themesSubscription.unsubscribe();
    this.languagesSubscription && this.languagesSubscription.unsubscribe();
  }
}
