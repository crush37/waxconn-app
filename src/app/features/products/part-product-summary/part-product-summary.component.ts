import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { getCurrencySymbol } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Listing } from '@core/models/listing.model';
import { Product } from '../product/product.component';


@Component({
  selector: 'app-part-product-summary',
  templateUrl: './part-product-summary.component.html'
})
export class PartProductSummaryComponent implements OnInit {
  @Input() product!: Product;
  @Input() formGroup!: UntypedFormGroup;
  @Input() isPublishingListings!: boolean;

  channels!: any;
  selectedChannels: string[] = [];

  currencyCode!: string;
  disableQuantities: boolean = true;
  disableEdits: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.channels = response.app.channels.filter((channel: any) => !channel.salesDisabled);
      this.disableQuantities = !response.app.quantities;
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
    });
    this.setSelectedChannels();
    this.setFormGroup();
    this.isActive(this.product.status);
    this.isPublishing();
  }

  isActive(status: string) {
    if (status !== 'archived') {
      this.disableEdits = false;
      this.formGroup.enable();
    } else {
      this.disableEdits = true;
      this.formGroup.disable();
      this.formGroup.get('status')?.enable();
    }
  }

  isPublishing() {
    if (this.isPublishingListings) {
      this.disableEdits = true;
      this.formGroup.disable();
    }
  }

  isArchived(): boolean {
    return this.product.status === 'archived';
  }

  isDeleted(): boolean {
    return this.product.status === 'deleted';
  }

  setFormGroup(): void {
    this.formGroup.addControl('quantity', new UntypedFormControl(this.product.inventoryCount, Validators.min(1)));
    this.formGroup.addControl('price', new UntypedFormControl(this.product.price));
    this.formGroup.addControl('taxable', new UntypedFormControl(this.product.taxable ?? false));
    this.formGroup.addControl('barcode', new UntypedFormControl(this.product.barcode));
    this.formGroup.addControl('sku', new UntypedFormControl(this.product.sku));
    this.formGroup.addControl('formatQuantity', new UntypedFormControl(this.product.options.discogs?.formatQuantity));
    this.formGroup.addControl('weight', new UntypedFormControl(this.product.weight));
    this.formGroup.addControl('status', new UntypedFormControl(this.product.status));
    this.formGroup.addControl('channels', new UntypedFormControl(this.selectedChannels, Validators.required));
  }

  setSelectedChannels(): void {
    this.product.listings?.forEach((listing: Listing) => {
      if (!listing.cancelledAt) {
        this.selectedChannels.push(listing.channelId);
      }
    });
    this.selectedChannels = [...new Set(this.selectedChannels)];
  }

  selectChannel(id: string, event: MatCheckboxChange): void {
    const i = this.selectedChannels.indexOf(id);
    event.checked ?
      this.selectedChannels.push(id) :
      this.selectedChannels.splice(i, 1);

    this.formGroup.patchValue({ channels: this.selectedChannels });
    this.formGroup.controls.channels.markAsDirty();
  }

  isChannelChecked(id: string): boolean {
    return this.selectedChannels.includes(id);
  }

  isPublishingListing(channelId: string): boolean {
    const listing = this.product.listings?.find((listing: Listing) => listing.channelId === channelId);

    return listing ? listing.publishedAt === null : false;
  }
}
