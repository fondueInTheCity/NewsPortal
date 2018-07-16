import {Component, OnInit} from '@angular/core';
import {InfoService, NewsService, ProfileService, UserService, AuthenticationService, RegularService, ErrorService} from '../../../service';
import {first} from 'rxjs/internal/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile-info',
  templateUrl: 'profile-info.component.html',
  styleUrls: ['profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  profile = this.profileService;
  checkList: boolean[] = [false, false, false, false, false, false];
  Username: FormControl;
  FirstName: FormControl;
  LastName: FormControl;
  Country: FormControl;
  City: FormControl;
  Bio: FormControl;
  username: string;
  addNewInformation = false;

  constructor(private router: Router,
              private newsService: NewsService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private toastr: ToastrService,
              private infoService: InfoService,
              private authenticationService: AuthenticationService,
              private regularService: RegularService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'];
    });
    this.Username = new FormControl(`${this.profile.getUser().username}`,
      [ Validators.required, Validators.pattern(this.usernamePattern())]);
    this.FirstName = new FormControl(`${this.profile.getUser().firstName}`, Validators.pattern(this.firstNamePatten()));
    this.LastName = new FormControl(`${this.profile.getUser().lastName}`, Validators.pattern(this.lastNamePattern()));
    this.Country = new FormControl(`${this.profile.getUser().country}`, Validators.pattern(this.countryPattern()));
    this.City = new FormControl(`${this.profile.getUser().city}`, Validators.pattern(this.cityPattern()));
    this.Bio = new FormControl(`${this.profile.getUser().bio}`, Validators.pattern(this.bioPattern()));
  }

  editSection(idCheck: number) {
    if (this.isCanEdit()) {
      this.checkList[idCheck] = true;
    }
  }

  editUsername() {
    if (this.Username.invalid) {
      this.Username.reset(this.profile.getUser().username);
      this.infoService.alertInformation(this.errorService.ERROR, this.errorService.INVALID_USERNAME);
    } else {
      this.userService.uniqueUsername(this.Username.value).pipe(first()).subscribe((isUnique) => {
        if (isUnique || this.Username.value === this.profile.getUser().username) {
          this.profile.getUser().username = this.Username.value;
          this.authenticationService.setCurrentUsername(this.profile.getUser().username);
          this.setToBack();
          this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_CHANGE_USERNAME);
        } else {
          this.Username.reset(this.profile.getUser().username);
          this.infoService.alertInformation(this.errorService.ERROR, this.errorService.USERNAME_IS_NOT_UNIQUE);
        }
      });
    }
    this.checkList[0] = false;
  }

  saveChange() {
    for (const index in this.checkList) {
      if (this.checkList[index]) {
        switch (index) {
          case '1': {
            if (this.FirstName.invalid) {
              this.FirstName.reset(this.profile.getUser().firstName);
              this.infoService.alertInformation(this.errorService.ERROR, this.errorService.INVALID_FIRST_NAME);
            } else {
              this.profile.getUser().firstName = this.FirstName.value;
              this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_CHANGE_FIRST_NAME);
            }
            break;
          }
          case '2': {
            if (this.LastName.invalid) {
              this.LastName.reset(this.profile.getUser().lastName);
              this.infoService.alertInformation(this.errorService.ERROR, this.errorService.INVALID_LAST_NAME);
            } else {
              this.profile.getUser().lastName = this.LastName.value;
              this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_CHANGE_LAST_NAME);
            }
            break;
          }
          case '3': {
            if (this.Country.invalid) {
              this.Country.reset(this.profile.getUser().country);
              this.infoService.alertInformation(this.errorService.ERROR, this.errorService.INVALID_COUNTRY);
            } else {
              this.profile.getUser().country = this.Country.value;
              this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_CHANGE_COUNTRY);
            }
            break;
          }
          case '4': {
            if (this.City.invalid) {
              this.City.reset(this.profile.getUser().city);
              this.infoService.alertInformation(this.errorService.ERROR, this.errorService.INVALID_CITY);
            } else {
              this.profile.getUser().city = this.City.value;
              this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_CHANGE_CITY);
            }
            break;
          }
          case '5': {
            if (this.Bio.invalid) {
              this.Bio.reset(this.profile.getUser().bio);
              this.infoService.alertInformation(this.errorService.ERROR, this.errorService.INVALID_BIO);
            } else {
              this.profile.getUser().bio = this.Bio.value;
              this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_CHANGE_BIO);
            }
            break;
          }
        }
      }
      if (!this.addNewInformation) {
        this.setToBack();
      }
      this.checkList[index] = false;
    }
  }

  saveInputStats(idCheck: number) {
    this.checkList[idCheck] = true;
    this.saveChange();
  }

  setToBack() {
    this.userService.update(this.profile.getUser()).pipe(first()).subscribe(() => {
      this.profileService.setProfileByUsername(this.profile.getUser().username);
      this.router.navigate([`/profile/${this.profile.getUser().username}`]);
    });
  }

  handleFileInput(files: FileList) {
    const formdata: FormData = new FormData();
    formdata.append('file', files.item(0));
    this.userService.uploadImage(formdata, this.profile.getUser().id).pipe(first()).subscribe(() => {
      this.profileService.setProfileByUsername(this.profile.getUser().username);
    });
  }


  showNewInformation() {
    this.addNewInformation = true;
  }

  saveChanges() {
    this.saveChange();
    this.addNewInformation = false;
  }

  showSection(idCheck: number): boolean {
    return this.checkList[idCheck] || this.addNewInformation;
  }

  isCanEdit(): boolean {
      return this.authenticationService.isCanEdit(this.username);
  }

  usernamePattern(): string {
    return this.regularService.usernamePattern;
  }

  firstNamePatten(): string {
    return this.regularService.firstNamePattern;
  }

  lastNamePattern(): string {
    return this.regularService.lastNamePattern;
  }

  countryPattern(): string {
    return this.regularService.countryPattern;
  }

  cityPattern(): string {
    return this.regularService.cityPattern;
  }

  bioPattern(): string {
    return this.regularService.bioPattern;
  }
}
