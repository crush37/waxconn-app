import { Component, Input } from '@angular/core';
import { OrderItem } from '@core/models/order-item.model';

@Component({
  selector: 'app-part-order-summary',
  templateUrl: './part-order-summary.component.html'
})
export class PartOrderSummaryComponent {
  @Input() totalDiscounts: number = 0;
  @Input() items: OrderItem[] = [];

  itemsCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  orderTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) - this.totalDiscounts;
  }
}
