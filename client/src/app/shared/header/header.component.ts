import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  themes: Theme[];
  languages: Language[];

  private themesSubscription: Subscription;
  private languagesSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private profileService: ProfileService) {}

  ngOnInit() {
    this.themesSubscription = this.userService.getThemes()
      .pipe(first())
      .subscribe(
        (themes) => {
          this.themes = themes;
        });

    this.languagesSubscription = this.userService.getLanguages()
      .pipe(first())
      .subscribe(
        (languages) => {
          this.languages = languages;
          this.translate.setDefaultLang(this.authenticationService.getCurrentLanguage());
        });
  }

  switchLanguage(language: Language) {
    if (this.isLogin()) {
      this.languagesSubscription = this.userService.setLanguage(this.authenticationService.getCurrentUsername(), language)
        .pipe(first())
        .subscribe(
          () => {
            this.authenticationService.setCurrentLanguage(language.name);
          });
    }
    this.translate.use(language.name);
  }

  switchTheme(theme: Theme) {
    if (this.isLogin()) {
      this.themesSubscription = this.userService.setTheme(this.authenticationService.getCurrentUsername(), theme)
        .pipe(first())
        .subscribe(
          () => {
            this.authenticationService.setCurrentTheme(theme.name);
          });
    }
    this.setDomTheme(theme.name);
  }

  setDomTheme(theme: string) {
    const themeElem = document.getElementsByName('themeElem')[0];
    const themeClass = themeElem.classList[0];
    themeElem.classList.remove(themeClass);
    themeElem.classList.add('theme-' + theme.toLowerCase());
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

  ngOnDestroy(): void {
    this.themesSubscription && this.themesSubscription.unsubscribe();
    this.languagesSubscription && this.languagesSubscription.unsubscribe();
  }
}
