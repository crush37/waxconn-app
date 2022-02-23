import { Component, Input } from '@angular/core';
import { Order } from '@features/orders/order/order.component';

@Component({
  selector: 'app-part-order-totals',
  templateUrl: './part-order-totals.component.html'
})
export class PartOrderTotalsComponent {
  @Input() order!: Order;
}
