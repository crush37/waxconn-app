import { Component, Input } from '@angular/core';
import { itemPluralMapping } from '@core/i118n-plural-mapping';
import { Customer } from '../customer/customer.component';

@Component({
  selector: 'app-part-customer-overview',
  templateUrl: './part-customer-overview.component.html'
})
export class PartCustomerOverviewComponent {
  @Input() customer!: Customer;
  itemPluralMapping = itemPluralMapping;
}
