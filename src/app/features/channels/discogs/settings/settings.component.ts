import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ApiMetaService } from '@core/services/api-meta.service';
import { Location } from '@core/models/location.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatAccordion } from '@angular/material/expansion';
import { Setting, SettingSerializer } from '../discogs.model';

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
  title = 'Discogs';
  subTitle = 'Settings';

  id!: string;
  settings!: Setting;
  formGroup = new FormGroup({});

  locations!: Location[];
  listingPolicy!: string;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

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
          this.listingPolicy = settings.listingPolicy;
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
      name: new FormControl(this.settings?.name || 'Discogs'),
      locationId: new FormControl(this.settings?.locationId, Validators.required),
      apiUsername: new FormControl(this.settings?.apiUsername, Validators.required),
      apiToken: new FormControl(this.settings?.apiToken, Validators.required),
      trackedShipmentTemplate: new FormControl(this.settings?.trackedShipmentTemplate, Validators.required),
      productDescriptionTemplate: new FormControl(this.settings?.productDescriptionTemplate, Validators.required),
      isActive: new FormControl(this.settings?.isActive || false),
      syncReleases: new FormControl(this.settings?.syncReleases || false),
      listingPolicy: new FormControl(this.settings?.listingPolicy, Validators.required),
      listingPolicyQuantity: new FormControl(this.settings?.listingPolicyQuantity ?? 1, Validators.required)
    });
  }

  toggleListingPolicy(event: MatRadioChange) {
    this.listingPolicy = event.value;
  }
}
