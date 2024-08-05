import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Setting, SettingSerializer } from '@core/models/setting.model';
import { ActivatedRoute } from '@angular/router';
import { ApiMetaService } from '@core/services/api-meta.service';
import { Country, Timezone } from '@core/models/meta.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'settings' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: SettingSerializer },
  ]
})
export class GeneralComponent implements OnInit {
  loading = false;
  title = 'General';
  subTitle = 'Settings';

  id!: string;
  setting!: Setting;
  formGroup!: UntypedFormGroup;

  countries!: Country[];
  timezones!: Timezone[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Setting>,
    private apiMetaService: ApiMetaService) {
    this.setFormGroup();
  }

  ngOnInit(): void {
    this.getMetaData();
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.id = response.app.id;
      this.getData();
    });
  }

  getMetaData(): void {
    this.loading = true;
    forkJoin({
      countries: this.apiMetaService.getCountries(),
      timezones: this.apiMetaService.getTimezones(),
    }).subscribe((meta: {countries: Country[], timezones: Timezone[]}) => {
      this.countries = meta.countries;
      this.timezones = meta.timezones;
      this.loading = false;
    })
  }

  getData(): void {
    this.loading = true;
    this.apiService.index({}, false).subscribe((data: any) => {
      this.setting = data[0];
      this.setFormGroup();
      this.loading = false;
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
      name: new UntypedFormControl(this.setting?.name, Validators.required),
      companyName: new UntypedFormControl(this.setting?.companyName, Validators.required),
      taxNumber: new UntypedFormControl(this.setting?.taxNumber),
      address1: new UntypedFormControl(this.setting?.address1, Validators.required),
      address2: new UntypedFormControl(this.setting?.address2),
      country: new UntypedFormControl(this.setting?.country, Validators.required),
      region: new UntypedFormControl(this.setting?.region),
      city: new UntypedFormControl(this.setting?.city, Validators.required),
      postcode: new UntypedFormControl(this.setting?.postcode, Validators.required),
      email: new UntypedFormControl(this.setting?.email, Validators.required),
      phone: new UntypedFormControl(this.setting?.phone),
      language: new UntypedFormControl(this.setting?.language, Validators.required),
      currency: new UntypedFormControl(this.setting?.currency, Validators.required),
      timezone: new UntypedFormControl(this.setting?.timezone, Validators.required)
    });
  }
}
