import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {LoginRequestDto} from '../../dto';
import {AuthenticationService, ErrorService, InfoService, RegularService} from '../../service';

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
    private regularService: RegularService,
    private infoService: InfoService,
    private errorService: ErrorService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern())]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern())]]
    });

    this.authenticationService.logout();

    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code != null) {
      this.authenticationService.activate(this.code).pipe(first())
        .subscribe(
          () => {
            this.infoService.alertInformation(this.errorService.SUCCESS, this.errorService.SUCCESS_REGISTRATION);
          });
    }
  }

  get formControl() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.loading = true;
      this.authenticationService.login(new LoginRequestDto(this.formControl.username.value, this.formControl.password.value))
        .pipe(first())
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  usernamePattern(): string {
    return this.regularService.usernamePattern;
  }

  passwordPattern(): string {
    return this.regularService.passwordPattern;
  }
}
