import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService, RegularService} from '../../service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  submitted = false;
  code: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private regularService: RegularService) {}

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(this.regularService.passwordPattern)]]
    });

    this.code = this.route.snapshot.paramMap.get('code');
  }

  get formControl() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid)  {
      return;
    }
    this.loading = true;
    this.authenticationService.sendNewPassword(this.code, this.formControl.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        });
  }
}
