import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formGroup!: UntypedFormGroup;
  returnUrl!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      email: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const params = this.formGroup.getRawValue();
      concat(this.authService.csrfCookie(), this.authService.login(params)).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }
  }
}
