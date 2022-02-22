import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RepricingAgentRoutingModule } from './repricing-agent-routing.module';
import { RepricingListComponent } from './repricing-list/repricing-list.component';
import { RepricingCreateComponent } from './repricing-create/repricing-create.component';
import { RepricingDetailsComponent } from './repricing-details/repricing-details.component';
import { RepricingDetailsChannelListComponent } from './repricing-details-channel-list/repricing-details-channel-list.component';

@NgModule({
  declarations: [RepricingListComponent, RepricingCreateComponent, RepricingDetailsComponent, RepricingDetailsChannelListComponent],
  imports: [
    SharedModule,
    RepricingAgentRoutingModule
  ]
})
export class RepricingAgentModule {
}
