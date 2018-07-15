import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService, RegularService} from '../../service';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.css']
})
export class RememberComponent implements OnInit {

  emailForm: FormGroup;
  submitted = false;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private regularService: RegularService) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.regularService.emailPattern)]]
    });
  }

  // convenience getter for easy access to form fields
  get formControl() { return this.emailForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.emailForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService.sendCodeNewPassword(this.formControl.email.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['login']);
        });
  }
}
