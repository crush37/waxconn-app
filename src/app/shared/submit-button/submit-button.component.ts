import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent {
  @Input() label = 'Save';
  @Input() formGroup!: FormGroup;
  @Input() mode = 'normal';
  @Input() reload = false;
  @Input() goTo?: string;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private apiService: ApiService<any>) {
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.apiService.save(this.formGroup.getRawValue()).subscribe(() => {
      this.snackbar.open('All changes saved successfully!', 'close');
      this.router.navigateByUrl(
        (this.goTo ? this.goTo : this.router.url) + (this.reload ? '?refresh=true' : '')
      );
    }, () => {
      this.formGroup.markAsPristine();
    });
  }
}
