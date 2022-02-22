import { Component, Input } from '@angular/core';
import { Order } from '@core/models/order.model';
import { OrderItem } from '@core/models/order-item.model';

@Component({
  selector: 'app-part-order-item-list',
  templateUrl: './part-order-item-list.component.html'
})
export class PartOrderItemListComponent {
  @Input() loading!: boolean;
  @Input() order!: Order;
  @Input() orderItems: { data: OrderItem[] | null } = { data: null };

  item = (row: OrderItem) => row;
}
