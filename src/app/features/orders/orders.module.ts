import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PosModule } from '@features/channels/pos/pos.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PartOrderItemListComponent } from './part-order-item-list/part-order-item-list.component';
import { PartOrderCustomerOverviewComponent } from './part-order-customer-overview/part-order-customer-overview.component';
import { PartOrderNotesComponent } from './part-order-notes/part-order-notes.component';
import { PartOrderSummaryComponent } from './part-order-summary/part-order-summary.component';
import { PartOrderTotalsComponent } from './part-order-totals/part-order-totals.component';
import { OrderFulfillmentDialogComponent } from './order-fulfillment-dialog/order-fulfillment-dialog.component';
import { OrderPaymentDialogComponent } from './order-payment-dialog/order-payment-dialog.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderListComponent,
    PartOrderItemListComponent,
    PartOrderCustomerOverviewComponent,
    PartOrderNotesComponent,
    PartOrderSummaryComponent,
    PartOrderTotalsComponent,
    OrderFulfillmentDialogComponent,
    OrderPaymentDialogComponent
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
    PosModule
  ]
})
export class OrdersModule {
}
