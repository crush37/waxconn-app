import { Component, Input } from '@angular/core';
import { Order } from '@core/models/order.model';

@Component({
  selector: 'app-part-customer-order-list',
  templateUrl: './part-customer-order-list.component.html'
})
export class PartCustomerOrderListComponent {
  @Input() orderList: { data: Order[] | null } = { data: null };

  o = (row: Order) => row;
}
