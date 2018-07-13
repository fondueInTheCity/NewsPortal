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
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  checkList: boolean[] = [false, false, false, false, false, false];
  user: UserEditDto;
  username: string;
  role: string;
  addNewInformation = false;

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
    this.role = this.user.role;
  }

  editSection(idCheck: number) {
    if (this.canEdit()) {
      this.checkList[idCheck] = true;
    }
  }

  saveChanges(idCheck: number) {
    this.setToBack(this.user);
    this.checkList[idCheck] = false;
  }


  setToBack(user: UserEditDto) {
    user.role = this.userService.transformRoleToBackEnd(this.user.role);
    user.language = this.user.language;
    user.theme = this.user.theme;
    this.userService.update(this.user).pipe(first()).subscribe(() => {
      this.user.role = this.userService.transformRoleToView(this.user.role);
      this.profileService.setUser(this.user);
      this.router.navigate([`/profile/${this.user.username}`]);
    });
  }

  handleFileInput(files: FileList) {
    let formdata: FormData = new FormData();
    formdata.append('file', files.item(0));
    this.userService.uploadImage(formdata, this.user.id).pipe(first()).subscribe(() => {
      this.userService.getByUsername(this.user.username).pipe(first()).subscribe((user) => {
        this.user = user;
        this.user.role = this.userService.transformRoleToView(this.user.role);
        this.profileService.setUser(this.user);
        this.router.navigate([`/profile/${this.user.username}`]);
      });
    });
  }

  showNewInformation() {
    this.addNewInformation = !this.addNewInformation;
  }

  showSection(idCheck: number): boolean {
    return this.checkList[idCheck] || this.addNewInformation;
  }

  canEdit(): boolean {
    return this.currentUser.userRole === 'ROLE_ADMIN' || this.username === this.currentUser.username;
  }

}
