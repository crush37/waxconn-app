import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Order as BaseOrder, OrderSerializer as BaseOrderSerializer } from '@core/models/order.model';
import { OrderAddress, OrderAddressSerializer } from '@core/models/order-address.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';

export class Order extends BaseOrder {
  shippingAddress!: OrderAddress | null;
}

@Injectable()
export class OrderSerializer extends BaseOrderSerializer {
  fromJson(json: any): Order {
    const resource = new Order();
    resource.shippingAddress = json.shipping_address
      ? new OrderAddressSerializer().fromJson(json.shipping_address)
      : null;

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'orders' },
    {
      provide: 'apiServiceOptions', useValue: {
        with: 'shippingAddress', payment_status: 'all', fulfillment_status: 'all', status: 'open', sort_by: 'updated_at'
      }
    },
    { provide: 'apiServiceSerializer', useClass: OrderSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'orders' },
  ]
})
export class OrderListComponent {
  title = 'Orders';
  subTitle = 'List';
  searchConfig: SearchConfig = {
    label: 'Filter Orders',
    appearance: 'outline',
    showFilterInput: true,
    selects: [
      {
        name: 'payment_status', header: 'Payment', default: 'all', multiple: false,
        options: [
          { text: 'All', value: 'all' },
          { text: 'Pending', value: 'pending' },
          { text: 'Requires Confirmation', value: 'requires_confirmation' },
          { text: 'Authorized', value: 'authorized' },
          { text: 'Partially Paid', value: 'partially_paid' },
          { text: 'Paid', value: 'paid' },
          { text: 'Partially Refunded', value: 'partially_refunded' },
          { text: 'Refunded', value: 'refunded' },
          { text: 'Voided', value: 'voided' }
        ]
      },
      {
        name: 'fulfillment_status', header: 'Fulfillment', default: 'all', multiple: false,
        options: [
          { text: 'All', value: 'all' },
          { text: 'Unfulfilled', value: 'unfulfilled' },
          { text: 'Fulfilled', value: 'fulfilled' },
          { text: 'Partially Fulfilled', value: 'partially_fulfilled' },
          { text: 'Restocked', value: 'restocked' },
        ]
      },
      {
        name: 'status', header: 'Status', default: 'open', multiple: false,
        options: [
          { text: 'All', value: 'all' },
          { text: 'Open', value: 'open' },
          { text: 'Archived', value: 'archived' },
          { text: 'Cancelled', value: 'cancelled' },
        ]
      }
    ],
    withAutoRefresh: false,
  };

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      if (response.app.channels.length > 0) {
        const options: { text: string, value: any }[] = [];
        options.push({ text: 'All', value: 'all' })
        response.app.channels.forEach((channel: any) => {
          options.push({ text: channel.name, value: channel.id })
        });
        this.searchConfig.selects?.unshift(
          {
            name: 'channel_id', header: 'Channel', default: 'all', multiple: false,
            options
          }
        );
      }
    });
  }

  g = (row: Order) => row;
}
