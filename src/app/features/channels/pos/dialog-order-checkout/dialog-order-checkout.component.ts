import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { Order as BaseOrder, OrderSerializer as BaseOrderSerializer } from '@core/models/order.model';
import { Customer } from '@core/models/customer.model';
import { OrderItem, OrderItemSerializer } from '@core/models/order-item.model';

export class Order extends BaseOrder {
  public customer!: Customer | null;
  public items!: OrderItem[] | null;
}

@Injectable()
export class OrderSerializer extends BaseOrderSerializer {
  toJson(resource: any): Order {
    const json: any = {};
    json.items = resource.items
      ? resource.items.map((item: any) => new OrderItemSerializer().toJson(item))
      : null;

    return { ...super.toJson(resource), ...json };
  }
}

@Component({
  selector: 'app-dialog-order-checkout',
  templateUrl: './dialog-order-checkout.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'orders' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: OrderSerializer },
  ]
})
export class DialogOrderCheckoutComponent implements OnInit {
  total!: number;
  itemsCount!: number;
  paid = false;
  submitting =  false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { formGroup: UntypedFormGroup },
    private apiService: ApiService<Order>,
    private dialogRef: MatDialogRef<DialogOrderCheckoutComponent>) {
  }

  ngOnInit(): void {
    const items = this.data.formGroup.get('items')?.value;
    const totalDiscounts = this.data.formGroup.get('totalDiscounts')?.value;
    this.total = items.reduce((acc: number, item: OrderItem) => acc + (item.price * item.quantity), 0) - totalDiscounts;
    this.itemsCount = items.reduce((acc: number, item: OrderItem) => acc + item.quantity, 0);
  }

  submit(): void {
    if (!this.data.formGroup.valid) {
      return;
    }

    this.submitting = true;
    this.apiService.save(this.data.formGroup.getRawValue()).subscribe({
      next: () => {
        this.data.formGroup.markAsPristine();
        this.data.formGroup.enable();
        this.paid = true;
      },
      error: () => {
        this.data.formGroup.enable();
      },
      complete: () => { this.submitting = false; }
    });
  }

  exit(): void {
    this.dialogRef.close(this.paid);
  }
}
