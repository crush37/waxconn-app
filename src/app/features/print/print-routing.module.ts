import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintOrderComponent } from "./print-order/print-order.component";

const routes: Routes = [
  { path: 'order/:id', component: PrintOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRoutingModule { }
