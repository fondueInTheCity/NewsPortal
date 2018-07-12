import {Component, OnInit, Input} from '@angular/core';
import {UserEditDto} from '../../../dto';
import {NewsService, ProfileService, UserService} from '../../../service';
import {first} from 'rxjs/internal/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AlertService} from '../../../auth/service';

@Component({
  selector: 'app-profile-info',
  templateUrl: 'profile-info.component.html',
  styleUrls: ['profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  //@Input() user: UserEditDto;
  user: UserEditDto;
  username: string;

  constructor(private router: Router,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.user = this.profileService.getUser();
      if (this.user.username !== this.username) {
        this.userService.getByUsername(this.username)
          .pipe(first())
          .subscribe((data: UserEditDto) => {
              this.user = data;
              this.user.role = this.userService.transformRoleToView(this.user.role);
              this.profileService.setUser(this.user);
            },
            error => {
              this.alertService.error(error);
            });
      }
    });
  }

}
