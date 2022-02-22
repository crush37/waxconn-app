import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceModeComponent } from './maintenance-mode/maintenance-mode.component';

const routes: Routes = [
  { path: '', component: MaintenanceModeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceModeRoutingModule { }
