import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsManagerComponent } from './listings-manager/listings-manager.component';

const routes: Routes = [
  { path: '', component: ListingsManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsManagerRoutingModule { }
