import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaintenanceModeRoutingModule } from './maintenance-mode-routing.module';
import { MaintenanceModeComponent } from './maintenance-mode/maintenance-mode.component';

@NgModule({
  declarations: [MaintenanceModeComponent],
  imports: [
    SharedModule,
    MaintenanceModeRoutingModule
  ]
})
export class MaintenanceModeModule {
}
