import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListingsManagerRoutingModule } from './listings-manager-routing.module';
import { ListingsManagerComponent } from './listings-manager/listings-manager.component';

@NgModule({
  declarations: [ListingsManagerComponent],
  imports: [
    SharedModule,
    ListingsManagerRoutingModule
  ]
})
export class ListingsManagerModule {
}
