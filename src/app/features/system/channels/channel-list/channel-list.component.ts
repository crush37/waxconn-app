import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Channel, ChannelSerializer } from '@core/models/channel.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'channels' },
    { provide: 'apiServiceOptions', useValue: { sort_by: 'id', sort_order: 'asc' } },
    { provide: 'apiServiceSerializer', useClass: ChannelSerializer }
  ]
})
export class ChannelListComponent implements OnInit {
  loading = false;
  title = 'Channels';
  subTitle = 'Settings';

  hasLocation = false;

  val = (row: Channel) => row;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.hasLocation = !!response.app.location;
    });
  }
}
