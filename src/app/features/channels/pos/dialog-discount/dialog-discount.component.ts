import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getCurrencySymbol } from '@angular/common';
import { OrderItem } from '@core/models/order-item.model';

@Component({
  selector: 'app-dialog-discount',
  templateUrl: './dialog-discount.component.html',
})
export class DialogDiscountComponent implements OnInit {
  itemsCount!: number;
  paid = false;
  currencyCode!: string;

  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { formGroup: FormGroup },
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogDiscountComponent>) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.formGroup = this.data.formGroup;
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
    });
  }

  getMaxDiscount(): number {
    const items = this.data.formGroup.get('items')?.value;
    return items.reduce((acc: number, item: OrderItem) => acc + (item.price * item.quantity), 0);
  }

  submit(): void {
    if (!this.formGroup.controls.totalDiscounts.value) {
      this.formGroup.controls.totalDiscounts.patchValue(0);
    }
    this.dialogRef.close(this.formGroup);
    this.data.formGroup.enable();
  }
}
