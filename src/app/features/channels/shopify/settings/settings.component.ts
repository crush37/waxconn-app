import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formGroup = new FormGroup({});

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
        this.id = params.get('id') || this.id;
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
    this.formGroup = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.settings?.name || 'Shopify'),
      locationId: new FormControl(this.settings?.locationId, Validators.required),
      hostname: new FormControl(this.settings?.hostname, Validators.required),
      apiKey: new FormControl(this.settings?.apiKey, Validators.required),
      apiPassword: new FormControl(this.settings?.apiPassword, Validators.required),
      apiSharedSecret: new FormControl(this.settings?.apiSharedSecret, Validators.required),
      isActive: new FormControl(this.settings?.isActive || false),
      productUpdatesPolicy: new FormControl(this.settings?.productUpdatesPolicy, Validators.required),
      deleteOutOfStockProducts: new FormControl(this.settings?.deleteOutOfStockProducts || false),
    });
  }

  toggleProductPolicy(event: MatRadioChange) {
    this.productUpdatesPolicy = event.value;
  }
}
