import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProfileService, UserService} from '../../service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {UserEditDto, NewsInfoDto} from '../../dto';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile = this.profileService;
  user = new  UserEditDto();
  news: NewsInfoDto[] = [];
  viewMode = 'newsTab';
  username: string;

  private routeSubscription: Subscription;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService) {}

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.profileService.setProfileByUsername(params['username']);
    });
  }

  ngOnDestroy() {
    this.routeSubscription && this.routeSubscription.unsubscribe();
  }

}
