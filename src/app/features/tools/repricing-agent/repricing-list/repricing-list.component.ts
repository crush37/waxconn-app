import { Component, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Repricing as BaseRepricing, RepricingSerializer as BaseRepricingSerializer } from '@core/models/repricing.model';
import { RepricingChannel, RepricingChannelSerializer } from '@core/models/repricing-channel.model';

export class Repricing extends BaseRepricing {
  public channels!: RepricingChannel[] | null;
}

@Injectable()
export class RepricingSerializer extends BaseRepricingSerializer {
  fromJson(json: any): Repricing {
    const resource = new Repricing();
    resource.channels = json.channels.map((channel: any) => new RepricingChannelSerializer().fromJson(channel));

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-repricing-list',
  templateUrl: './repricing-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'repricings' },
    { provide: 'apiServiceOptions', useValue: { with: 'channels', sort_by: 'id', sort_order: 'desc', per_page: 10 } },
    { provide: 'apiServiceSerializer', useClass: RepricingSerializer }
  ]
})
export class RepricingListComponent {
  title = 'Repricing Agent';
  subTitle = 'Bulk & Tools';

  val = (row: Repricing) => row;
}
