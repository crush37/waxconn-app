import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SuspendedRoutingModule } from './suspended-routing.module';
import { SuspendedComponent } from './suspended/suspended.component';

@NgModule({
  declarations: [SuspendedComponent],
  imports: [
    SharedModule,
    SuspendedRoutingModule
  ]
})
export class SuspendedModule {
}
