import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {AlertService} from '../../../auth/service/alert.service';
import {first} from 'rxjs/internal/operators';
import { Subscription } from 'rxjs';

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

  private routeSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
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
    let user = this.editUserForm.value;
    user.role = this.userService.transformRoleToBackEnd(this.user.role);
    this.loading = true;
    this.routeSubscription = this.userService.update(user)
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

  ngOnDestroy(): void {
    this.routeSubscription && this.routeSubscription.unsubscribe();
  }

}
