import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Customer as BaseCustomer, CustomerSerializer as BaseCustomerSerializer } from '@core/models/customer.model';
import { CustomerAddress, CustomerAddressSerializer } from '@core/models/customer-address.model';
import { Order, OrderSerializer } from '@core/models/order.model';

export class Customer extends BaseCustomer {
  public defaultAddress!: CustomerAddress | null;
  public orders!: Order[] | null;
}

@Injectable()
export class CustomerSerializer extends BaseCustomerSerializer {
  fromJson(json: any): Customer {
    const resource = new Customer();
    resource.defaultAddress = json.default_address
      ? new CustomerAddressSerializer().fromJson(json.default_address)
      : null;
    resource.orders = json.orders
      ? json.orders.map((order: any) => new OrderSerializer().fromJson(order))
      : null;

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'customers' },
    { provide: 'apiServiceOptions', useValue: { with: 'defaultAddress,orders' } },
    { provide: 'apiServiceSerializer', useClass: CustomerSerializer },
  ]
})
export class CustomerComponent implements OnInit {
  loading = false;
  title = 'Customer';
  subTitle = 'View';
  buttons = { back: true };

  id!: string;
  customer!: Customer;
  orderList: { data: Order[] } = { data: [] };

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Customer>) {
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
    this.apiService.get(this.id).subscribe((customer: Customer) => {
      this.customer = customer;
      this.orderList.data = customer.orders || [];
      this.loading = false;
    });
  }
}
