import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() formGroup!: FormGroup;

  channels!: any;
  selectedChannels: string[] = [];

  currencyCode!: string;
  disableQuantities: boolean = true;
  disableEdits: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.channels = response.app.channels;
      this.disableQuantities = !response.app.quantities;
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
    });
    this.setSelectedChannels();
    this.setFormGroup();
    this.isActive(this.product.status)
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

  isArchived(): boolean {
    return this.product.status === 'archived';
  }

  isDeleted(): boolean {
    return this.product.status === 'deleted';
  }

  setFormGroup(): void {
    this.formGroup.addControl('quantity', new FormControl(this.product.inventoryCount, Validators.min(1)));
    this.formGroup.addControl('price', new FormControl(this.product.price));
    this.formGroup.addControl('barcode', new FormControl(this.product.barcode));
    this.formGroup.addControl('sku', new FormControl(this.product.sku));
    this.formGroup.addControl('formatQuantity', new FormControl(this.product.options.discogs?.formatQuantity));
    this.formGroup.addControl('weight', new FormControl(this.product.weight));
    this.formGroup.addControl('status', new FormControl(this.product.status));
    this.formGroup.addControl('channels', new FormControl(this.selectedChannels, Validators.required));
  }

  setSelectedChannels(): void {
    this.product.listings?.forEach((listing: Listing) => {
      if (!listing.unpublishedAt) {
        this.selectedChannels.push(listing.channelId);
      }
    });
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
}
