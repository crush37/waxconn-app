import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { OrderItemComponent } from './order-item/order-item.component';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: ':id', component: OrderComponent },
  { path: ':orderId/items/:id', component: OrderItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
