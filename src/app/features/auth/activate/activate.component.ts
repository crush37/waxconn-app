import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordValidator } from '../password.validator';
import { concat } from 'rxjs';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
  formGroup!: UntypedFormGroup;
  activated = false;
  id!: string | null;
  hash!: string | null;
  signature!: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.hash = params.get('hash');
      this.signature = params.get('signature');

      this.formGroup = new UntypedFormGroup({
        password: new UntypedFormControl(null, Validators.compose([
          Validators.required,
          PasswordValidator.patternValidator(/\d/, { hasNumber: true }),
          PasswordValidator.patternValidator(/[A-Z]/, { hasUpperCase: true }),
          PasswordValidator.patternValidator(/[a-z]/, { hasLowerCase: true }),
          Validators.minLength(8)
        ])),
        passwordConfirmation: new UntypedFormControl(null, Validators.compose([
          Validators.required,
          PasswordValidator.matchValidator
        ]))
      });
    });
  }

  get password() {
    return this.formGroup.controls['password'];
  }

  get confirmation() {
    return this.formGroup.controls['passwordConfirmation'];
  }

  onSubmit(): void {
    if (this.formGroup.valid && this.id && this.hash && this.signature) {
      concat(this.authService.csrfCookie(), this.authService.activate(
        this.id, this.hash, this.signature, this.formGroup.getRawValue())
      ).subscribe(next => {
        if (next) {
          this.activated = true;
        }
      });
    }
  }
}
