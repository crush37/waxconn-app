import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import {
  Repricing as BaseRepricing,
  RepricingSerializer as BaseRepricingSerializer
} from '@core/models/repricing.model';
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
  selector: 'app-repricing-details',
  templateUrl: './repricing-details.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'repricings' },
    { provide: 'apiServiceOptions', useValue: { with: 'channels' } },
    { provide: 'apiServiceSerializer', useClass: RepricingSerializer }
  ]
})
export class RepricingDetailsComponent implements OnInit {
  loading = false;
  title = 'Repricing';
  subTitle = 'View';
  buttons = { back: true };

  id!: string;
  repricing?: Repricing;
  repricingChannels: { data: RepricingChannel[] | null } = { data: null };
  formGroup!: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Repricing>) {
    this.setFormGroup();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((repricing: Repricing) => {
          this.repricing = repricing;
          this.repricingChannels.data = repricing.channels;
          this.setFormGroup();
          this.loading = false;
        });
      }
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
    });
  }
}
