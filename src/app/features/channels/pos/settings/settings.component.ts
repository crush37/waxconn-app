import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Setting, SettingSerializer } from '../pos.model';
import { Location } from '@core/models/location.model';
import { ApiMetaService } from '@core/services/api-meta.service';

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
  title = 'Pos';
  subTitle = 'Settings';

  id!: string;
  settings!: Setting;
  formGroup = new UntypedFormGroup({});

  locations!: Location[];

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
      name: new UntypedFormControl(this.settings?.name || 'Store'),
      locationId: new UntypedFormControl(this.settings?.locationId, Validators.required),
      isActive: new UntypedFormControl(this.settings?.isActive || false)
    });
  }
}
