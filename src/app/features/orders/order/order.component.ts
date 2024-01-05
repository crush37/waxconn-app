import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { Order as BaseOrder, OrderSerializer as BaseOrderSerializer } from '@core/models/order.model';
import { OrderItem, OrderItemSerializer } from '@core/models/order-item.model';
import { Customer, CustomerSerializer } from '@core/models/customer.model';
import { OrderAddress, OrderAddressSerializer } from '@core/models/order-address.model';
import { OrderFulfillmentDialogComponent } from '../order-fulfillment-dialog/order-fulfillment-dialog.component';
import { OrderPaymentDialogComponent } from '../order-payment-dialog/order-payment-dialog.component';

export class Order extends BaseOrder {
  public customer!: Customer | null;
  public shippingAddress!: OrderAddress | null;
  public billingAddress!: OrderAddress | null;
  public items!: OrderItem[] | null;
}

@Injectable()
export class OrderSerializer extends BaseOrderSerializer {
  fromJson(json: any): Order {
    const resource = new Order();
    resource.customer = json.customer
      ? new CustomerSerializer().fromJson(json.customer)
      : null;
    json.addresses?.forEach((address: any) => {
      if (address.type === 'shipping') {
        resource.shippingAddress = new OrderAddressSerializer().fromJson(address);
      }
      if (address.type === 'billing') {
        resource.billingAddress = new OrderAddressSerializer().fromJson(address);
      }
    });
    resource.items = json.items
      ? json.items.map((item: any) => new OrderItemSerializer().fromJson(item))
      : null;

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'orders' },
    { provide: 'apiServiceOptions', useValue: { with: 'customer,addresses,items' } },
    { provide: 'apiServiceSerializer', useClass: OrderSerializer },
  ]
})
export class OrderComponent implements OnInit {
  appName!: string;
  title = 'Order';
  subTitle = 'View';

  loading = false;
  id!: string;
  order!: Order;
  orderItems: { data: OrderItem[] | null } = { data: null };

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog,
    private apiService: ApiService<Order>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.apiService.get(this.id).subscribe((order: Order) => {
      this.order = order;
      this.orderItems.data = order.items;
      this.loading = false;
    });
  }

  openFulfillmentDialog(): void {
    const dialogRef = this.dialog.open(OrderFulfillmentDialogComponent, {
      data: { orderId: this.id, channelType: this.order.channelType },
      width: '400px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.loadData();
      }
    });
  }

  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(OrderPaymentDialogComponent, {
      data: {
        orderId: this.id,
        reference: this.order.reference,
        channelType: this.order.channelType,
        total: this.order.total
      },
      width: '400px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.loadData();
      }
    });
  }

  printOrder(): void {
    const url = '/print/order/' + this.id;

    window.open(
      this.router.serializeUrl(this.router.createUrlTree([url])), '_blank'
    );
  }
}
