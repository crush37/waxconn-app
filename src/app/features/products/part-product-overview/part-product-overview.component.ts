import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiMetaService } from "@core/services/api-meta.service";
import { Product } from '../product/product.component';
import { getCurrencySymbol } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Listing } from "@core/models/listing.model";
import { Editor, Toolbar } from "ngx-editor";

@Component({
  selector: 'app-part-product-overview',
  templateUrl: './part-product-overview.component.html'
})
export class PartProductOverviewComponent implements OnInit {
  @Input() product!: Product;
  @Input() formGroup!: UntypedFormGroup;

  channels!: any;
  currencyCode!: string;
  disableQuantities: boolean = true;
  latestRepricing!: { operation: string, channels: string[]|string, createdAt: string }|null;

  commentsOptions: string[] = [];
  filteredCommentsOptions!: Observable<string[]>;

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.channels = response.app.channels?.sort((a: any, b: any) => (a.type > b.type) ? 1 : -1);
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
      this.disableQuantities = !response.app.quantities;
      this.latestRepricing = response.app.repricing;
    });

    this.editor = new Editor();

    this.getCommentsOptions();
    this.setFormGroup();
    this.setFormGroupListings();

    this.filteredCommentsOptions = this.formGroup.controls.comments.valueChanges.pipe(
      map(value => this.filterComments(value || '')),
    );
  }

  private filterComments(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.commentsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCommentsOptions(): void {
    this.apiMetaService.getDiscogsComments().subscribe((comments: string[]) => {
      this.commentsOptions = comments;
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
    this.formGroup.addControl('listingTitle', new UntypedFormControl(this.product.listingTitle));
    this.formGroup.addControl('vendor', new UntypedFormControl(this.product.vendor));
    this.formGroup.addControl('description', new UntypedFormControl(this.product.description));
    this.formGroup.addControl('mediaCondition', new UntypedFormControl(this.product.options.discogs?.mediaCondition, Validators.required));
    this.formGroup.addControl('sleeveCondition', new UntypedFormControl(this.product.options.discogs?.sleeveCondition));
    this.formGroup.addControl('comments', new UntypedFormControl(this.product.options.discogs?.comments));
    this.formGroup.addControl('privateComments', new UntypedFormControl(this.product.options.discogs?.privateComments));

    this.formGroup.addControl('metaTitle', new UntypedFormControl(this.product.metaTitle));
    this.formGroup.addControl('metaDescription', new UntypedFormControl(this.product.metaDescription));
    this.formGroup.addControl('allowOffers', new UntypedFormControl(this.product.options.discogs?.allowOffers ?? false));
  }

  setFormGroupListings(): void {
    this.product.listings?.sort((a, b) => (a.channelType > b.channelType) ? 1 : -1);
    this.product.listings?.forEach((listing: Listing, index, object) => {
        this.listings.push(new UntypedFormGroup({
          id: new UntypedFormControl(listing.id),
          channelName: new UntypedFormControl(listing.channelName),
          channelType: new UntypedFormControl(listing.channelType),
          externalId: new UntypedFormControl(listing.externalId),
          productId: new UntypedFormControl(listing.productId),
          channelId: new UntypedFormControl(listing.channelId),
          available: new UntypedFormControl(listing.available),
          price: new UntypedFormControl(listing.price),
          isLocked: new UntypedFormControl(listing.isLocked || false),
        }));
    });
  }

  getMaxAvailable(): number {
    return this.formGroup.controls.quantity?.value;
  }

  wasModifiedByRepricing(listing: Listing): boolean {
    if (!this.latestRepricing) {
      return false;
    }

    let includedInRepricing = this.latestRepricing?.channels === 'all'
        || this.latestRepricing?.channels.includes(listing.channelId);

    return includedInRepricing && !listing.isLocked && this.latestRepricing.operation === 'create'
        && new Date(this.latestRepricing.createdAt) > new Date(this.product.createdAt);
  }
}
