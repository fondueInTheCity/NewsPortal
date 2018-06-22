import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services';
import {User} from '../_models';
import {first} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.addUser(this.registerForm.value);
  }



}
