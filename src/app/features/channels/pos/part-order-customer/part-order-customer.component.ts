import { Component, Input } from '@angular/core';
import { itemPluralMapping } from '@core/i118n-plural-mapping';
import { Customer } from '@core/models/customer.model';

@Component({
  selector: 'app-part-order-customer',
  templateUrl: './part-order-customer.component.html'
})
export class PartOrderCustomerComponent {
  @Input() customer?: Customer;

  itemPluralMapping = itemPluralMapping;
}
