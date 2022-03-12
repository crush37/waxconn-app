import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PartCustomerOverviewComponent } from './part-customer-overview/part-customer-overview.component';
import { PartCustomerOrderListComponent } from './part-customer-order-list/part-customer-order-list.component';
import { PartCustomerSummaryComponent } from './part-customer-summary/part-customer-summary.component';
import { DialogCustomerEditComponent } from './dialog-customer-edit/dialog-customer-edit.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    PartCustomerOverviewComponent,
    PartCustomerOrderListComponent,
    PartCustomerSummaryComponent,
    DialogCustomerEditComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
