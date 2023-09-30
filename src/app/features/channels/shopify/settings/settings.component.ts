import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Setting, SettingSerializer } from '../shopify.model';
import { Location } from '@core/models/location.model';
import { ApiMetaService } from '@core/services/api-meta.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'channels' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: SettingSerializer },
  ]
})
export class SettingsComponent implements OnInit {
  loading = false;
  title = 'Shopify';
  subTitle = 'Settings';

  id!: string;
  settings!: Setting;
  formGroup = new UntypedFormGroup({});

  locations!: Location[];
  productUpdatesPolicy!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Setting>,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') ?? this.id;
        this.loading = true;
        this.getMetaData();
        this.apiService.get(this.id).subscribe((settings: Setting) => {
          this.settings = settings;
          this.productUpdatesPolicy = settings.productUpdatesPolicy;
          this.setFormGroup();
          this.loading = false;
        });
      }
    });
  }

  getMetaData(): void {
    this.apiMetaService.getLocations().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
      name: new UntypedFormControl(this.settings?.name ?? 'Shopify'),
      locationId: new UntypedFormControl(this.settings?.locationId, Validators.required),
      hostname: new UntypedFormControl(this.settings?.hostname, Validators.required),
      apiKey: new UntypedFormControl(this.settings?.apiKey, Validators.required),
      apiPassword: new UntypedFormControl(this.settings?.apiPassword, Validators.required),
      apiSharedSecret: new UntypedFormControl(this.settings?.apiSharedSecret, Validators.required),
      isActive: new UntypedFormControl(this.settings?.isActive ?? false),
      taxable: new UntypedFormControl(this.settings?.taxable ?? false),
      publishByDefault: new UntypedFormControl(this.settings?.publishByDefault ?? true),
      deleteOutOfStockProducts: new UntypedFormControl(this.settings?.deleteOutOfStockProducts ?? false),
      productUpdatesPolicy: new UntypedFormControl(this.settings?.productUpdatesPolicy, Validators.required),
    });
  }

  toggleProductPolicy(event: MatRadioChange) {
    this.productUpdatesPolicy = event.value;
  }
}
