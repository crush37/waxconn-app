import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '@core/services/api.service';
import { Product as BaseProduct, ProductSerializer as BaseProductSerializer } from '@core/models/product.model';
import { Listing, ListingSerializer } from '@core/models/listing.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';

export class Product extends BaseProduct {
  public listings!: Listing[] | null;
}

@Injectable()
export class ProductSerializer extends BaseProductSerializer {
  fromJson(json: any): Product {
    const resource = new Product();
    resource.listings = json.listings
      ? json.listings.map((listing: any) => new ListingSerializer().fromJson(listing))
      : null;

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'products' },
    { provide: 'apiServiceOptions', useValue: { with: 'listings', status: 'active' } },
    { provide: 'apiServiceSerializer', useClass: ProductSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'products' },
  ]
})
export class ProductListComponent implements OnInit {
  title = 'Products';
  subTitle = 'List';
  searchConfig: SearchConfig = {
    label: 'Filter Products',
    appearance: 'outline',
    showFilterInput: true,
    selects: [
      {
        name: 'status', header: 'Status', default: 'active', multiple: false,
        options: [
          { text: 'All', value: 'all' },
          { text: 'Active', value: 'active' },
          { text: 'Draft', value: 'draft' },
          { text: 'Archived', value: 'archived' },
        ]
      },
      {
        name: 'sort_by', header: 'Sort By', default: 'created_at', multiple: false,
        options: [
          { text: 'Title', value: 'title' },
          { text: 'Created', value: 'created_at' },
          { text: 'Updated', value: 'updated_at' },
          { text: 'Price', value: 'price' },
        ]
      },
      {
        name: 'sort_order', header: 'Sort Order', default: 'desc', multiple: false,
        options: [
          { text: 'Asc', value: 'asc' },
          { text: 'Desc', value: 'desc' },
        ]
      }
    ],
    withAutoRefresh: false,
  };
  imagePlaceholder = './assets/default-placeholder.png';

  ids: string[] = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private location: Location,
      private apiService: ApiService<any>,
      private dialog: MatDialog,
      private snackbar: MatSnackBar,
      private dataListService: DataListService) {
  }

  ngOnInit(): void {
    this.dataListService.announced$.subscribe(() => this.ids = []);

    // adds filter by channel

    // this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
    //   const channels = response.app.channels.filter((channel: any) => !channel.salesDisabled);
    //   this.searchConfig.selects?.push({
    //     name: 'listings[channel_id]', header: 'Channel', default: 'all', multiple: false,
    //     options: channels.map((channel: any) => {
    //       return { text: channel.type, value: channel.id }
    //     })
    //   });
    // });
  }

  g = (row: Product) => row;

  productChannels(listings: Listing[]): string[] {
    listings = listings.filter((listing: Listing) => listing.unpublishedAt === null);
    const channels = listings.map(listing => listing.channelName);

    return channels.filter((channel, index) => {
      return channels.indexOf(channel) === index;
    });
  }

  onImgError(event: any) {
    event.target.src = this.imagePlaceholder;
  }

  selectAll(event: MatCheckboxChange, ids: string[]): void {
    this.ids = event.checked ? ids : [];
  }

  areAllSelected(ids: string[]): boolean {
    return this.ids.length === ids?.length;
  }

  selectOne(event: MatCheckboxChange, id: string): void {
    event.checked ? this.ids.push(id) : this.ids.splice(this.ids.indexOf(id, 0), 1);
  }

  isSelected(id: string): boolean {
    return this.ids.includes(id);
  }

  openConfirmDialog(status: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        title: 'Perform the bulk update?',
        message: 'This operation cannot be undone.'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm && this.ids) {
        this.apiService.batchUpdate(this.ids, { status }).subscribe(() => {
          this.snackbar.open('All items queued for processing.', 'close');
          setTimeout(() => {
            const path = decodeURI(this.location.path());
            this.router.navigateByUrl(decodeURI(path + '/refresh'), { skipLocationChange: true }).then(() => {
              this.router.navigate([path]);
            });
          }, 500);
        });
      }
    });
  }
}
