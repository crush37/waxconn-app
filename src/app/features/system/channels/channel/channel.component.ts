import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Channel, ChannelSerializer } from '@core/models/channel.model';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'channels' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: ChannelSerializer }
  ]
})
export class ChannelComponent implements OnInit {
  loading = false;

  title = 'Channel';
  subTitle = 'Settings';

  id!: string;
  channel?: Channel;
  formGroup!: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Channel>) {
    this.setFormGroup();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((channel: Channel) => {
          this.channel = channel;
          this.setFormGroup();
          this.loading = false;
        });
      }
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({});
  }
}
