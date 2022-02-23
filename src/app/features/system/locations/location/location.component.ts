import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ApiMetaService } from '@core/services/api-meta.service';
import { Location, LocationSerializer } from '@core/models/location.model';
import { Country, Courier } from '@core/models/meta.model';
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
  formGroup!: FormGroup;

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
    this.formGroup = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.location?.name, Validators.required),
      address1: new FormControl(this.location?.address1, Validators.required),
      address2: new FormControl(this.location?.address2),
      country: new FormControl(this.location?.country, Validators.required),
      countryCode: new FormControl(this.location?.countryCode, Validators.required),
      region: new FormControl(this.location?.region),
      city: new FormControl(this.location?.city, Validators.required),
      postcode: new FormControl(this.location?.postcode, Validators.required),
      phone: new FormControl(this.location?.phone),
      default: new FormControl(this.location?.default || true, Validators.required)
    });
  }

  onSetCountry(event: MatSelectChange): void
  {
    const country = this.countries.find((country) => { return country.name === event.value });
    this.formGroup.get('countryCode')?.patchValue(country?.code);
  }
}
