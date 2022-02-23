import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  returnUrl!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
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
