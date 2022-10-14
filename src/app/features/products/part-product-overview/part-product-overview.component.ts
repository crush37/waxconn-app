import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  @Input() formGroup!: FormGroup;

  currencyCode!: string;
  disableQuantities: boolean = true;

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
    return this.formGroup.controls['listings'] as FormArray;
  }

  isListedOn(channel: string): boolean {
    return !!this.product.listings?.find(listing => {
      return listing.channelType === channel;
    });
  }

  setFormGroup(): void {
    this.formGroup.addControl('title', new FormControl(this.product.title));
    this.formGroup.addControl('vendor', new FormControl(this.product.vendor));
    this.formGroup.addControl('description', new FormControl(this.product.description));
    this.formGroup.addControl('mediaCondition', new FormControl(this.product.options.discogs?.mediaCondition));
    this.formGroup.addControl('sleeveCondition', new FormControl(this.product.options.discogs?.sleeveCondition));
    this.formGroup.addControl('comments', new FormControl(this.product.options.discogs?.comments));
    this.formGroup.addControl('privateComments', new FormControl(this.product.options.discogs?.privateComments));
    this.formGroup.addControl('location', new FormControl(this.product.options.discogs?.location));

    this.formGroup.addControl('metaTitle', new FormControl(this.product.metaTitle));
    this.formGroup.addControl('metaDescription', new FormControl(this.product.metaDescription));
  }

  setFormGroupListings(): void {
    this.product.listings?.sort((a, b) => (a.channelType > b.channelType) ? 1 : -1);
    this.product.listings?.forEach((listing: any) => {
      if (!listing.unpublishedAt) {
        this.listings.push(new FormGroup({
          channelName: new FormControl(listing.channelName),
          channelType: new FormControl(listing.channelType),
          productId: new FormControl(listing.productId),
          channelId: new FormControl(listing.channelId),
          available: new FormControl(listing.available),
          price: new FormControl(listing.price),
        }));
      }
    });
  }

  getMaxAvailable(): number {
    return this.formGroup.controls.quantity?.value;
  }
}
