﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../service';
import {LoginRequestDto} from '../../dto';
import {AuthenticationService, RegularService} from '../../service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  code: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private regularService: RegularService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();

    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code != null) {
      this.authenticationService.activate(this.code).pipe(first())
        .subscribe(
          () => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }

  get formControl() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(new LoginRequestDto(this.formControl.username.value, this.formControl.password.value))
      .pipe(first())
      .subscribe(() => {
        this.loading = false;
      });
  }

  usernamePattern(): string {
    return this.regularService.usernamePattern;
  }

  passwordPattern(): string {
    return this.regularService.passwordPattern;
  }
}
