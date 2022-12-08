import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApiMetaService } from "@core/services/api-meta.service";
import { Product } from '../product/product.component';
import { getCurrencySymbol } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-part-product-overview',
  templateUrl: './part-product-overview.component.html'
})
export class PartProductOverviewComponent implements OnInit {
  @Input() product!: Product;
  @Input() formGroup!: UntypedFormGroup;

  currencyCode!: string;
  disableQuantities: boolean = true;
  latestRepricing!: { operation: string, channels: string[]|string, createdAt: string };

  commentsOptions: string[] = [];
  locationsOptions: string[] = [];

  filteredCommentsOptions!: Observable<string[]>;
  filteredLocationsOptions!: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.disableQuantities = !response.app.quantities;
      this.latestRepricing = response.app.repricing;
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
    });

    this.getCommentsOptions();
    this.getLocationsOptions();
    this.setFormGroup();
    this.setFormGroupListings();

    this.filteredCommentsOptions = this.formGroup.controls.comments.valueChanges.pipe(
      map(value => this.filterComments(value || '')),
    );

    this.filteredLocationsOptions = this.formGroup.controls.location.valueChanges.pipe(
      map(value => this.filterLocations(value || '')),
    );
  }

  private filterComments(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.commentsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private filterLocations(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locationsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCommentsOptions(): void {
    this.apiMetaService.getDiscogsComments().subscribe((comments: string[]) => {
      this.commentsOptions = comments;
    });
  }

  getLocationsOptions(): void {
    this.apiMetaService.getDiscogsLocations().subscribe((locations: string[]) => {
      this.locationsOptions = locations;
    });
  }

  get listings() {
    return this.formGroup.controls['listings'] as UntypedFormArray;
  }

  isListedOn(channel: string): boolean {
    return !!this.product.listings?.find(listing => {
      return listing.channelType === channel;
    });
  }

  setFormGroup(): void {
    this.formGroup.addControl('title', new UntypedFormControl(this.product.title));
    this.formGroup.addControl('vendor', new UntypedFormControl(this.product.vendor));
    this.formGroup.addControl('description', new UntypedFormControl(this.product.description));
    this.formGroup.addControl('mediaCondition', new UntypedFormControl(this.product.options.discogs?.mediaCondition));
    this.formGroup.addControl('sleeveCondition', new UntypedFormControl(this.product.options.discogs?.sleeveCondition));
    this.formGroup.addControl('comments', new UntypedFormControl(this.product.options.discogs?.comments));
    this.formGroup.addControl('privateComments', new UntypedFormControl(this.product.options.discogs?.privateComments));
    this.formGroup.addControl('location', new UntypedFormControl(this.product.options.discogs?.location));

    this.formGroup.addControl('metaTitle', new UntypedFormControl(this.product.metaTitle));
    this.formGroup.addControl('metaDescription', new UntypedFormControl(this.product.metaDescription));
  }

  setFormGroupListings(): void {
    this.product.listings?.sort((a, b) => (a.channelType > b.channelType) ? 1 : -1);
    this.product.listings?.forEach((listing: any) => {
      if (!listing.unpublishedAt) {
        this.listings.push(new UntypedFormGroup({
          id: new UntypedFormControl(listing.id),
          channelName: new UntypedFormControl(listing.channelName),
          channelType: new UntypedFormControl(listing.channelType),
          externalId: new UntypedFormControl(listing.externalId),
          productId: new UntypedFormControl(listing.productId),
          channelId: new UntypedFormControl(listing.channelId),
          available: new UntypedFormControl(listing.available),
          price: new UntypedFormControl(listing.price),
          isLocked: new UntypedFormControl(listing.isLocked),
        }));
      }
    });
  }

  getMaxAvailable(): number {
    return this.formGroup.controls.quantity?.value;
  }

  wasModifiedByRepricing(channelId: string): boolean {
    let includedInRepricing = this.latestRepricing.channels === 'all'
        || this.latestRepricing.channels.includes(channelId);

    return includedInRepricing && this.latestRepricing.operation === 'create'
        && new Date(this.latestRepricing.createdAt) > new Date(this.product.createdAt);
  }
}
