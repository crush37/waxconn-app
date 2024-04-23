import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShopifyRoutingModule } from './shopify-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgxEditorModule } from "ngx-editor";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule,
    ShopifyRoutingModule,
    ClipboardModule,
    NgxEditorModule,
  ]
})
export class ShopifyModule {
}
