import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintRoutingModule } from './print-routing.module';
import { PrintOrderComponent } from './print-order/print-order.component';
import { MatCardModule } from "@angular/material/card";
import { PosModule } from "@features/channels/pos/pos.module";
import { OrdersModule } from "@features/orders/orders.module";

@NgModule({
  declarations: [
    PrintOrderComponent
  ],
  imports: [
    CommonModule,
    PrintRoutingModule,
    MatCardModule,
    PosModule,
    OrdersModule
  ]
})
export class PrintModule { }
