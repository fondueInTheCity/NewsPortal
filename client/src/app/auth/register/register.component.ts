import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {ErrorService, InfoService, UserService, RegularService} from '../../service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private infoService: InfoService,
    private regularService: RegularService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.regularService.firstNamePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regularService.lastNamePattern)]],
      username: ['', [Validators.required, Validators.pattern(this.regularService.usernamePattern)]],
      password: ['', [Validators.required, Validators.pattern(this.regularService.passwordPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.regularService.emailPattern)]]
    });
  }

  get formControl() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.addUser(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (errorDto) => {
          this.infoService.alertInformation(errorDto.error, errorDto.message);
          if (errorDto.error === this.errorService.SUCCESS) {
            this.router.navigate(['/login']);
          }
          this.loading = false;
        });
  }
}
