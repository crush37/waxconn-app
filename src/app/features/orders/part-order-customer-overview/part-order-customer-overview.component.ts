import { Component, Input } from '@angular/core';
import { itemPluralMapping } from '@core/i118n-plural-mapping';
import { Order } from '@features/orders/order/order.component';

@Component({
  selector: 'app-part-order-customer-overview',
  templateUrl: './part-order-customer-overview.component.html'
})
export class PartOrderCustomerOverviewComponent {
  @Input() order!: Order;
  itemPluralMapping = itemPluralMapping;
}
