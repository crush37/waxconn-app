import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShopifyRoutingModule } from './shopify-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule,
    ShopifyRoutingModule
  ]
})
export class ShopifyModule {
}
