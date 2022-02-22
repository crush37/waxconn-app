import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formGroup!: FormGroup;

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
    this.apiService.get(this.id).subscribe((account: Setting) => {
      this.setting = account;
      this.setFormGroup();
      this.loading = false;
    });
  }

  setFormGroup(): void {
    this.formGroup = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.setting?.name, Validators.required),
      companyName: new FormControl(this.setting?.companyName, Validators.required),
      taxNumber: new FormControl(this.setting?.taxNumber),
      address1: new FormControl(this.setting?.address1, Validators.required),
      address2: new FormControl(this.setting?.address2),
      country: new FormControl(this.setting?.country, Validators.required),
      region: new FormControl(this.setting?.region),
      city: new FormControl(this.setting?.city, Validators.required),
      postcode: new FormControl(this.setting?.postcode, Validators.required),
      email: new FormControl(this.setting?.email, Validators.required),
      phone: new FormControl(this.setting?.phone),
      language: new FormControl(this.setting?.language, Validators.required),
      currency: new FormControl(this.setting?.currency, Validators.required),
      timezone: new FormControl(this.setting?.timezone, Validators.required)
    });
  }
}
