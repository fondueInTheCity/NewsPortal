import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, Params} from "@angular/router";
import {UserService} from "../../../_services/user.service";
import {AlertService} from "../../../_services/alert.service";
import {first} from "rxjs/internal/operators";
import {ProfileComponent} from "../profile.component";
import {User} from "../../../_models/user";

@Component({
  selector: 'app-profile-edit',
  templateUrl: 'profile-edit.component.html',
  styleUrls: ['profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() user: any;
  editUserForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      id: [this.user.id, Validators.required],
      username: [this.user.username, Validators.pattern('^[a-zA-Z0-9_-]{3,15}$')],
      firstName: [this.user.firstName, Validators.pattern("^[а-яА-Яa-zA-Z ,.'-]+$")],
      lastName: [this.user.lastName, Validators.pattern("^[а-яА-Яa-zA-Z ,.'-]+$")],
      country: [this.user.country, Validators.pattern("^[а-яА-Яa-zA-Z ,.'-]+$")],
      city: [this.user.city, Validators.pattern("^[а-яА-Яa-zA-Z ,.'-]+$")],
      bio: [this.user.bio, Validators.maxLength(1000)],
      avatar: [this.user.avatar]//, Validators.pattern("/^.+\.(jpe?g|gif|png)$/i")]
    });
  }

  get formEditControls() { return this.editUserForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editUserForm.invalid) {
      return;
    }
    let user = this.updateUserWithForm();
    this.loading = true;
    this.userService.update(user)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Saved");
          this.loading = false;
          this.submitted = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          this.submitted = false;
        });
  }

  updateUserWithForm(){
    let currentUser = this.user;
    let formUser = this.editUserForm.value;
    currentUser.username = formUser.username;
    currentUser.firstName = formUser.firstName;
    currentUser.lastName = formUser.lastName;
    currentUser.country = formUser.country;
    currentUser.city = formUser.city;
    currentUser.bio = formUser.bio;
    currentUser.avatar = formUser.avatar;
    return currentUser;
  }

}
