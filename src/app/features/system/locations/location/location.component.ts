import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ApiMetaService } from '@core/services/api-meta.service';
import { Location, LocationSerializer } from '@core/models/location.model';
import { Country } from '@core/models/meta.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'locations' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: LocationSerializer }
  ]
})
export class LocationComponent implements OnInit {
  loading = false;
  title = 'Location';
  subTitle = 'Settings';

  id!: string;
  location?: Location;
  formGroup!: UntypedFormGroup;

  countries!: Country[];
  // couriers?: Courier[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Location>,
    private apiMetaService: ApiMetaService) {
    this.setFormGroup();
  }

  ngOnInit(): void {
    this.getCountries();
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((location: Location) => {
          this.location = location;
          // this.getCouriers(location.country);
          this.setFormGroup();
          this.loading = false;
        });
      }
    });
  }

  getCountries(): void {
    this.apiMetaService.getCountries().subscribe((countries: Country[]) => {
      this.countries = countries;
    });
  }

  // getCouriers(country: string): void {
  //   this.apiMetaService.getCouriers(country).subscribe((couriers: Courier[]) => {
  //     this.couriers = couriers;
  //   });
  // }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
      name: new UntypedFormControl(this.location?.name, Validators.required),
      address1: new UntypedFormControl(this.location?.address1, Validators.required),
      address2: new UntypedFormControl(this.location?.address2),
      country: new UntypedFormControl(this.location?.country, Validators.required),
      countryCode: new UntypedFormControl(this.location?.countryCode, Validators.required),
      region: new UntypedFormControl(this.location?.region),
      city: new UntypedFormControl(this.location?.city, Validators.required),
      postcode: new UntypedFormControl(this.location?.postcode, Validators.required),
      phone: new UntypedFormControl(this.location?.phone),
      default: new UntypedFormControl(this.location?.default || true, Validators.required)
    });
  }

  onSetCountry(event: MatSelectChange): void
  {
    const country = this.countries.find((country) => { return country.name === event.value });
    this.formGroup.get('countryCode')?.patchValue(country?.code);
  }
}
