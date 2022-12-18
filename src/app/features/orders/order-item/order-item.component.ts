import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { OrderItem as BaseOrderItem, OrderItemSerializer as BaseOrderItemSerializer } from '@core/models/order-item.model';
import { OrderAddress, OrderAddressSerializer } from '@core/models/order-address.model';
import { Product, ProductSerializer } from '@core/models/product.model';
import { Order, OrderSerializer } from '@features/orders/order/order.component';

export class OrderItem extends BaseOrderItem {
  public order!: Order;
  public product!: Product;
  public shippingAddress!: OrderAddress | null;
  public billingAddress!: OrderAddress | null;
}

@Injectable()
export class OrderItemSerializer extends BaseOrderItemSerializer {
  fromJson(json: any): OrderItem {
    const resource = new OrderItem();
    resource.order = new OrderSerializer().fromJson(json.order);
    resource.product = new ProductSerializer().fromJson(json.product);
    json.addresses?.forEach((address: any) => {
      if (address.type === 'shipping') {
        resource.shippingAddress = new OrderAddressSerializer().fromJson(address);
      }
      if (address.type === 'billing') {
        resource.billingAddress = new OrderAddressSerializer().fromJson(address);
      }
    });

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'order_items' },
    { provide: 'apiServiceOptions', useValue: { with: 'order,product,product.images,product.options' } },
    { provide: 'apiServiceSerializer', useClass: OrderItemSerializer },
  ]
})
export class OrderItemComponent implements OnInit {
  loading = false;
  title = 'Order Item';
  subTitle = 'View';

  id!: string;
  orderItem!: OrderItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<OrderItem>) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((orderItem: OrderItem) => {
          this.orderItem = orderItem;
          this.loading = false;
        });
      }
    });
  }
}
