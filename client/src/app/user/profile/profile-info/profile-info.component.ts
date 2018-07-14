import {Component, OnInit, Input} from '@angular/core';
import {UserEditDto} from '../../../dto';
import {InfoService, NewsService, ProfileService, UserService} from '../../../service';
import {first} from 'rxjs/internal/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AlertService, AuthenticationService} from '../../../auth/service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile-info',
  templateUrl: 'profile-info.component.html',
  styleUrls: ['profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  profile = this.profileService;
  checkList: boolean[] = [false, false, false, false, false, false];
  username: string;
  addNewInformation = false;

  constructor(private router: Router,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private toastr: ToastrService,
              private infoService: InfoService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
    });
  }

  editSection(idCheck: number) {
    if (this.isCanEdit()) {
      this.checkList[idCheck] = true;
    }
  }

  saveChanges(idCheck: number) {
    this.setToBack();
    this.checkList[idCheck] = false;
  }

  setToBack() {
    this.userService.update(this.profile.getUser()).pipe(first()).subscribe(() => {
      this.profileService.setProfileByUsername(this.profile.getUser().username);
    });
  }

  editUsername() {
    this.checkList[0] = false;
    if (this.profile.getUser().username !== '') {
      if (this.username === this.profile.getUser().username) {
        return;
      }
      this.userService.uniqueUsername(this.profile.getUser().username).pipe(first()).subscribe((isUnique) => {
        if (isUnique) {
          this.saveChanges(0);
          this.infoService.alertInformation('success', 'You are change username.');
          if (this.username === this.authenticationService.getCurrentUsername()) {
            this.authenticationService.logout();
          }
        } else {
          this.infoService.alertInformation('error', 'This username isn`t unique.');
        }
      });
    } else {
      this.profile.getUser().username = this.username;
      this.infoService.alertInformation('warning', 'You can`t remove username.');
    }
  }

  handleFileInput(files: FileList) {
    let formdata: FormData = new FormData();
    formdata.append('file', files.item(0));
    this.userService.uploadImage(formdata, this.profile.getUser().id).pipe(first()).subscribe(() => {
      this.profileService.setProfileByUsername(this.profile.getUser().username);
    });
  }

  showNewInformation() {
    this.addNewInformation = !this.addNewInformation;
  }

  showSection(idCheck: number): boolean {
    return this.checkList[idCheck] || this.addNewInformation;
  }

  isCanEdit(): boolean {
      return this.authenticationService.isCanEdit(this.username);
    }

}
