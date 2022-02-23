import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ChannelsRoutingModule } from './channels-routing.module';
import { ChannelComponent } from './channel/channel.component';
import { ChannelListComponent } from './channel-list/channel-list.component';

@NgModule({
  declarations: [ChannelComponent, ChannelListComponent],
  imports: [
    SharedModule,
    ChannelsRoutingModule
  ]
})
export class ChannelsModule {
}
