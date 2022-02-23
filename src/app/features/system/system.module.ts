import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { GeneralComponent } from './general/general.component';
import { SettingsComponent } from './settings/settings.component';
import { BillingComponent } from './billing/billing.component';

@NgModule({
  declarations: [
    GeneralComponent,
    SettingsComponent,
    BillingComponent
  ],
  imports: [
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule {
}
