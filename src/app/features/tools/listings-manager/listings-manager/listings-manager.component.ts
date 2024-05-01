import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { MatRadioChange } from "@angular/material/radio";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ListingManager, ListingManagerSerializer } from "@core/models/listing-manager.model";

@Component({
  selector: 'app-listings-manager',
  templateUrl: './listings-manager.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'tools/listing-manager/update' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: ListingManagerSerializer }
  ]
})
export class ListingsManagerComponent implements OnInit {
  loading = false;
  title = 'Listings Manager';
  subTitle = 'Bulk & Tools';

  channels!: any;
  isListing = false;
  formGroup!: FormGroup;

  stepTwo: string | null = null;
  stepThree: string | null = null;

  shopifySelectedOptions: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<ListingManager>,
    private router: Router) {
    this.setFormGroup();
  }

  val = (row: ListingManager) => row;

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.channels = response.app.channels;
      this.isListing = response.app.listing;

      const shopifyChannel = this.channels.find((channel: any) => channel.type === 'shopify');
      this.formGroup.patchValue({ channelId: shopifyChannel.id });
    });
  }

  setFormGroup(): void {
    this.formGroup = new FormGroup({
      operation: new FormControl(null),
      channelId: new FormControl(null),
      fields: new FormControl(null)
    });
  }

  toggleStepTwo(event: MatRadioChange) {
    this.stepTwo = event.value;
  }

  toggleStepThree(event: MatRadioChange) {
    this.stepThree = event.value;
  }

  selectShopifyOption(property: string, event: MatCheckboxChange): void {
    const i = this.shopifySelectedOptions.indexOf(property);
    event.checked ?
      this.shopifySelectedOptions.push(property) :
      this.shopifySelectedOptions.splice(i, 1);

    this.formGroup.patchValue({ fields: this.shopifySelectedOptions });
    this.formGroup.get('fields')?.markAsDirty();
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.formGroup.disable();
    this.apiService.save(this.formGroup.getRawValue()).subscribe({
      next: () => {
        setTimeout(() => {
          this.formGroup.markAsPristine();
          this.formGroup.enable();
          this.router.navigateByUrl(this.router.url + '?refresh=true');
        }, 500);
      },
      error: () => {
        this.formGroup.enable();
      }
    });
  };
}
