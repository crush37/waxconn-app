import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { OrderItem } from '@core/models/order-item.model';
import { Product, ProductSerializer } from '@features/products/product-list/product-list.component';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'products' },
    { provide: 'apiServiceOptions', useValue: { with: 'listings', per_page: 50, status: 'active' } },
    { provide: 'apiServiceSerializer', useClass: ProductSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'pos' },
  ]
})
export class OrderProductListComponent {
  searchConfig: SearchConfig = {
    appearance: 'outline',
    showFilterInput: true,
    withAutoRefresh: true,
  };

  @Input() items: OrderItem[] = [];
  @Output() hide = new EventEmitter<boolean>();

  g = (row: Product) => row;

  imagePlaceholder = './assets/default-placeholder.png';

  viewMode = 'list';

  select(product: Product): void {
    let item = this.items.find(item => item.productId === product.id);
    if (!item && product.inventoryCount >= 1 && product.status !== 'draft' && this.availableOnPosChannel(product)) {
      item = new OrderItem();
      item.productId = product.id;
      item.externalId = this.getExternalId(product);
      item.thumb = product.thumb;
      item.title = product.title;
      item.vendor = product.vendor;
      item.quantity = 1;
      item.price = product.price;
      item.totalDiscount = 0;
      item.fulfillmentStatus = 'fulfilled';

      this.items.push(item);
    } else if (item && item.quantity < product.inventoryCount) {
      item.quantity++;
    }
  }

  availableOnPosChannel(product: Product): boolean {
    return product.listings?.some(listing => listing.channelType === 'pos') ?? false;
  }

  getExternalId(product: Product): string | null {
    const listing = product.listings?.find(listing => listing.channelType === 'pos');
    return listing ? listing.externalId : null;
  }

  itemsCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  inventoryCount(product: Product): number {
    const item = this.items.find(item => item.productId === product.id);
    return product.inventoryCount - (item?.quantity ?? 0);
  }

  close(): void {
    this.hide.emit(true);
  }

  onImgError(event: any) {
    event.target.src = this.imagePlaceholder;
  }

  setView(view: string) : void {
    this.viewMode = view;
  }
}
