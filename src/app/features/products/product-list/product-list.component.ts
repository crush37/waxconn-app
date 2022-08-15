import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { Product as BaseProduct, ProductSerializer as BaseProductSerializer } from '@core/models/product.model';
import { Listing, ListingSerializer } from '@core/models/listing.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';

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
export class ProductListComponent {
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
          { text: 'Active', value: 'active' },
          { text: 'Draft', value: 'draft' },
          { text: 'Archived', value: 'archived' },
        ]
      }
    ],
  };
  imagePlaceholder = './assets/default-placeholder.png';

  constructor(protected dialog: MatDialog) {
  }

  g = (row: Product) => row;

  productChannels(listings: Listing[]): string[] {
    listings = listings.filter((listing: Listing) => listing.unpublishedAt === null);
    const channels = listings.map(listing => listing.channelName);

    return channels.filter((channel, index) => {
      return channels.indexOf(channel) === index;
    });
  }

  onImgError(event: any){
    event.target.src = this.imagePlaceholder;
  }
}
