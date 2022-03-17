import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PosRoutingModule } from './pos-routing.module';
import { PosCreateOrderButtonComponent } from './pos-create-order-button/pos-create-order-button.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderComponent } from './order/order.component';
import { PartOrderCustomerComponent } from './part-order-customer/part-order-customer.component';
import { PartOrderItemListComponent } from './part-order-item-list/part-order-item-list.component';
import { PartOrderSummaryComponent } from './part-order-summary/part-order-summary.component';
import { DialogOrderCheckoutComponent } from './dialog-order-checkout/dialog-order-checkout.component';
import { OrderProductListComponent } from './order-product-list/order-product-list.component';
import { OrderCustomerComponent } from './order-customer/order-customer.component';
import { DialogDiscountComponent } from './dialog-discount/dialog-discount.component';

@NgModule({
  declarations: [
    PosCreateOrderButtonComponent,
    SettingsComponent,
    OrderComponent,
    PartOrderCustomerComponent,
    PartOrderItemListComponent,
    PartOrderSummaryComponent,
    DialogOrderCheckoutComponent,
    OrderProductListComponent,
    OrderCustomerComponent,
    DialogDiscountComponent,
  ],
  exports: [
    PosCreateOrderButtonComponent
  ],
  imports: [
    SharedModule,
    PosRoutingModule
  ]
})
export class PosModule {
}
