import { Component, Input } from '@angular/core';
import { Order } from '@features/orders/order/order.component';

@Component({
  selector: 'app-part-order-summary',
  templateUrl: './part-order-summary.component.html'
})
export class PartOrderSummaryComponent {
  @Input() order!: Order;
}
