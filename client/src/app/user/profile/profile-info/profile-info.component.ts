import {Component, OnInit, Input} from '@angular/core';
import {UserEditDto} from '../../../dto';
import {InfoService, NewsService, ProfileService, UserService, AuthenticationService, RegularService} from '../../../service';
import {first} from 'rxjs/internal/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../auth/service';
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
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private toastr: ToastrService,
              private infoService: InfoService,
              private authenticationService: AuthenticationService,
              private regularService: RegularService) { }

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

  saveChange() {
    for (let index in this.checkList) {
      if (this.checkList[index]) {
        switch (index) {
          case '0': {
            if (this.Username.invalid) {
              this.Username.reset(this.profile.getUser().username);
              this.infoService.alertInformation('error', 'Invalid Username');
            } else {
              this.profile.getUser().username = this.Username.value;
              this.infoService.alertInformation('success', 'You are change username.');
            }
            this.checkList[index] = false;
            break;
          }
          case '1': {
            if (this.FirstName.invalid) {
              this.FirstName.reset(this.profile.getUser().firstName);
              this.infoService.alertInformation('error', 'Invalid First Name');
            } else {
              this.profile.getUser().firstName = this.FirstName.value;
              this.infoService.alertInformation('success', 'You are change first name.');
            }
            this.checkList[index] = false;
            break;
          }
          case '2': {
            if (this.LastName.invalid) {
              this.LastName.reset(this.profile.getUser().lastName);
              this.infoService.alertInformation('error', 'Invalid Last Name');
            } else {
              this.profile.getUser().lastName = this.LastName.value;
              this.infoService.alertInformation('success', 'You are change last name.');
            }
            this.checkList[index] = false;
            break;
          }
          case '3': {
            if (this.Country.invalid) {
              this.Country.reset(this.profile.getUser().country);
              this.infoService.alertInformation('error', 'Invalid Country');
            } else {
              this.profile.getUser().country = this.Country.value;
              this.infoService.alertInformation('success', 'You are change country.');
            }
            this.checkList[index] = false;
            break;
          }
          case '4': {
            if (this.City.invalid) {
              this.City.reset(this.profile.getUser().city);
              this.infoService.alertInformation('error', 'Invalid City');
            } else {
              this.profile.getUser().city = this.City.value;
              this.infoService.alertInformation('success', 'You are change city.');
            }
            this.checkList[index] = false;
            break;
          }
          case '5': {
            if (this.Bio.invalid) {
              this.Bio.reset(this.profile.getUser().bio);
              this.infoService.alertInformation('error', 'Invalid Bio');
            } else {
              this.profile.getUser().bio = this.Bio.value;
              this.infoService.alertInformation('success', 'You are change bio.');
            }
            this.checkList[index] = false;
            break;
          }
        }
      }
    }
  }

  saveInputStats(idCheck: number) {
    this.checkList[idCheck] = true;
    this.saveChange();
    if (!this.addNewInformation) {
      this.setToBack();
    }
  }

  setToBack() {
    this.userService.update(this.profile.getUser()).pipe(first()).subscribe(() => {
      this.profileService.setProfileByUsername(this.profile.getUser().username);
    });
  }

  handleFileInput(files: FileList) {
    let formdata: FormData = new FormData();
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
