import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {InfoService, UserService} from '../../service';
import { AlertService } from '../service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private infoService: InfoService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get formControl() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.addUser(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (errorDto) => {
          this.infoService.alertInformation(errorDto.error, errorDto.message);
          if (errorDto.error === 'success') {
            this.router.navigate(['/login']);
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
