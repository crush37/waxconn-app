import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PartCustomerOverviewComponent } from './part-customer-overview/part-customer-overview.component';
import { PartCustomerOrderListComponent } from './part-customer-order-list/part-customer-order-list.component';
import { PartCustomerSummaryComponent } from './part-customer-summary/part-customer-summary.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    PartCustomerOverviewComponent,
    PartCustomerOrderListComponent,
    PartCustomerSummaryComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
