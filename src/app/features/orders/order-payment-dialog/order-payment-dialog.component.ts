import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { OrderTransaction, OrderTransactionSerializer } from '@core/models/order-transaction.model';

export interface DialogData {
  orderId: string;
  reference: string;
  channelType: string;
  total: string;
}

@Component({
  selector: 'app-order-payment-dialog',
  templateUrl: './order-payment-dialog.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'transactions' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: OrderTransactionSerializer }
  ]
})
export class OrderPaymentDialogComponent implements OnInit {
  loading = false;
  formGroup!: FormGroup;

  constructor(
    private apiService: ApiService<OrderTransaction>,
    public dialogRef: MatDialogRef<OrderPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      amount: new FormControl(this.data.total)
    });
  }

  submitForm(): boolean {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return false;
    }
    this.formGroup.disable();
    const item = { orderId: this.data.orderId, type: 'payment', ...this.formGroup.getRawValue() };
    this.apiService.save(item).subscribe(() => {
      this.dialogRef.close(true);
    }, () => {
      this.formGroup.enable();
    });

    return true;
  }
}
