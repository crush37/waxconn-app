import { Component, Input } from '@angular/core';
import { Customer } from '../customer/customer.component';

@Component({
  selector: 'app-part-customer-summary',
  templateUrl: './part-customer-summary.component.html'
})
export class PartCustomerSummaryComponent {
  @Input() customer!: Customer;
}
