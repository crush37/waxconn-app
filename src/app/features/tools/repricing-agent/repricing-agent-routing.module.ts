import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepricingListComponent } from './repricing-list/repricing-list.component';
import { RepricingCreateComponent } from './repricing-create/repricing-create.component';
import { RepricingDetailsComponent } from './repricing-details/repricing-details.component';

const routes: Routes = [
  { path: '', component: RepricingListComponent },
  { path: 'new', component: RepricingCreateComponent },
  { path: ':id', component: RepricingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepricingAgentRoutingModule { }
