import { Component, Input } from '@angular/core';
import { RepricingChannel } from '@core/models/repricing-channel.model';

@Component({
  selector: 'app-repricing-details-channel-list',
  templateUrl: './repricing-details-channel-list.component.html'
})
export class RepricingDetailsChannelListComponent {
  @Input() loading!: boolean;
  @Input() repricingChannels: { data: RepricingChannel[] | null } = { data: null };

  item = (row: RepricingChannel) => row;
}
