import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'orders/new', component: OrderComponent
  },
  {
    path: 'settings/:id', component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
