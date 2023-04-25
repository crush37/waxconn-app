import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { getCurrencySymbol } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiService } from '@core/services/api.service';
import { PriceSuggestion, PriceSuggestionSerializer, Release } from '../discogs.model';

@Component({
  selector: 'app-part-listing-summary',
  templateUrl: './part-listing-summary.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'discogs/price-suggestions' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: PriceSuggestionSerializer }
  ]
})
export class PartListingSummaryComponent implements OnInit {
  @Input() release!: Release;
  @Input() mediaCondition!: EventEmitter<string>;
  @Output() values = new EventEmitter<UntypedFormGroup>();

  channels!: any;
  selectedChannels: string[] = [];

  formGroup!: UntypedFormGroup;

  currencyCode!: string;
  priceSuggestion: { currency: string, value: number } | null = null;
  disableQuantities: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<PriceSuggestion>) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
      this.disableQuantities = !response.app.quantities;

      this.channels = response.app.channels.filter((channel: any) => !channel.salesDisabled);

      if (!this.release.blockedFromSale && this.release.status !== 'Draft') {
        this.selectedChannels = this.channels.map((channel: any) => {
          if (channel.publishByDefault) {
            return channel.id;
          }
        }).filter(Boolean);
      }

    });

    this.setFormGroup();
    this.values.emit(this.formGroup);
    this.onMediaConditionAdded();
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      quantity: new UntypedFormControl({value: 1, disabled: this.disableQuantities}, Validators.required),
      price: new UntypedFormControl(null, Validators.required),
      allowOffers: new UntypedFormControl(false, Validators.required),
      taxable: new UntypedFormControl(false, Validators.required),
      barcode: new UntypedFormControl(this.release.barcode),
      sku: new UntypedFormControl(null),
      formatQuantity: new UntypedFormControl(this.release.formatQuantity),
      weight: new UntypedFormControl(this.release.estimatedWeight),
      status: new UntypedFormControl('active', Validators.required),
      listings: new UntypedFormControl(this.selectedChannels, Validators.required)
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.values.emit(this.formGroup);
    });
  }

  selectChannel(id: string, event: MatCheckboxChange): void {
    const i = this.selectedChannels.indexOf(id);
    event.checked ?
      this.selectedChannels.push(id) :
      this.selectedChannels.splice(i, 1);

    this.formGroup.patchValue({ listings: this.selectedChannels });
    this.formGroup.controls.listings.markAsDirty();
  }

  isChannelChecked(id: string): boolean {
    return this.selectedChannels.includes(id);
  }

  onMediaConditionAdded(): void {
    this.mediaCondition.subscribe((value: string) => {
      this.apiService.get(this.release.id).subscribe((priceSuggestions: any) => {
        this.priceSuggestion = priceSuggestions.data[value];
      });
    });
  }

  setSuggestedPrice(): void {
    this.formGroup.patchValue({ price: this.priceSuggestion?.value.toFixed(2) });
    this.formGroup.controls.price.markAsDirty();
  }
}
