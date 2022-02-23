import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { Order as BaseOrder, OrderSerializer as BaseOrderSerializer } from '@core/models/order.model';
import { Customer } from '@core/models/customer.model';
import { OrderItem, OrderItemSerializer } from '@core/models/order-item.model';
import { bounceInOnEnterAnimation, fadeInOnEnterAnimation, } from 'angular-animations';

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
  ],
  animations: [
    fadeInOnEnterAnimation(),
    bounceInOnEnterAnimation()
  ]
})
export class DialogOrderCheckoutComponent implements OnInit {
  total!: number;
  itemsCount!: number;
  paid = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { formGroup: FormGroup },
    private apiService: ApiService<Order>,
    private dialogRef: MatDialogRef<DialogOrderCheckoutComponent>) {
  }

  ngOnInit(): void {
    const items = this.data.formGroup.get('items')?.value;
    this.total = items.reduce((acc: number, item: OrderItem) => acc + (item.price * item.quantity), 0);
    this.itemsCount = items.reduce((acc: number, item: OrderItem) => acc + item.quantity, 0);
  }

  submit(): void {
    if (!this.data.formGroup.valid) {
      return;
    }
    this.apiService.save(this.data.formGroup.getRawValue()).subscribe(() => {
      this.data.formGroup.markAsPristine();
      this.data.formGroup.enable();
      this.paid = true;
    }, () => {
      this.data.formGroup.enable();
    });
  }

  exit(): void {
    this.dialogRef.close(this.paid);
  }
}
