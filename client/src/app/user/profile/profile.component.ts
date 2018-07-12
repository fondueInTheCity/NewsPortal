import {Component, OnInit, OnDestroy} from '@angular/core';
import {NewsService, ProfileService, UserService} from '../../service';
import {AlertService} from '../../auth/service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserEditDto, NewsInfoDto} from '../../dto';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user = new  UserEditDto();
  news: NewsInfoDto[] = [];
  viewMode = 'newsTab';
  isCanEdit: boolean;
  isDeleted: boolean;
  username: string;

  private routeSubscription: Subscription;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private newsService: NewsService,
              private router: Router) {}

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.userService.getByUsername(this.username)
        .pipe(first())
        .subscribe((data: UserEditDto) => {
            this.user = data;
            this.newsService.getNewsByIdUser(this.user.id).pipe(first()).subscribe((news: NewsInfoDto[]) => {
              this.news = news;
            });
            this.isDeleted = this.user.deleted;
            this.user.role = this.userService.transformRoleToView(this.user.role);
            this.profileService.setUser(this.user);
            const currentUserJson = JSON.parse(localStorage.getItem('currentUser'));
            this.isCanEdit = ((currentUserJson.userRole === 'ROLE_ADMIN') || (this.user['username'] === currentUserJson.username));
          },
          error => {
          this.router.navigate(['/exception404'])
            this.alertService.error(error);
          });
    });
  }

  ngOnDestroy() {
    this.routeSubscription && this.routeSubscription.unsubscribe();
  }

}
