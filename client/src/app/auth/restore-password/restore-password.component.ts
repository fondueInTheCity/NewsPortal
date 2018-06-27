import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService, AuthenticationService} from '../service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  submitted = false;
  code: string;
  passwordConfirmError = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required, Validators.minLength(6)],
      passwordConfirm: ['', Validators.required]
    });

    this.code = this.route.snapshot.paramMap.get('code');
  }

  // convenience getter for easy access to form fields
  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.passwordConfirmError = this.f.password.value !== this.f.passwordConfirm.value;
    // stop here if form is invalid
    if (this.passwordForm.invalid || this.passwordConfirmError) {
      return;
    }

    this.authenticationService.sendNewPassword(this.code, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['login']);
        },
        error => {
          this.alertService.error(error);
        });
  }
}
