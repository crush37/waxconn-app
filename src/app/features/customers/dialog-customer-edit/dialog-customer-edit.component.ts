import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { bounceInOnEnterAnimation, fadeInOnEnterAnimation, } from 'angular-animations';
import { ApiService } from '@core/services/api.service';
import { Customer, CustomerSerializer } from '@core/models/customer.model';

@Component({
  selector: 'app-dialog-customer-edit',
  templateUrl: './dialog-customer-edit.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'customers' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: CustomerSerializer },
  ],
  animations: [
    fadeInOnEnterAnimation(),
    bounceInOnEnterAnimation()
  ]
})
export class DialogCustomerEditComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private apiService: ApiService<Customer>,
    public dialogRef: MatDialogRef<DialogCustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(this.data.firstName),
      lastName: new FormControl(this.data.lastName),
      email: new FormControl(this.data.email, Validators.required),
      phone: new FormControl(this.data.phone),
      acceptsMarketing: new FormControl(this.data.acceptsMarketing)
    });
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.formGroup.disable();
    const item = { id: this.data.id, ...this.formGroup.getRawValue() };
    this.apiService.save(item).subscribe(() => {
      this.dialogRef.close(item);
    });
  }
}
