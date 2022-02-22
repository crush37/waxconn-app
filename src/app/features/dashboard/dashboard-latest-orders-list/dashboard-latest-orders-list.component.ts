import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Order, OrderSerializer } from '@core/models/order.model';

@Component({
  selector: 'app-dashboard-latest-orders-list',
  templateUrl: './dashboard-latest-orders-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'orders' },
    { provide: 'apiServiceOptions', useValue: { limit: 5, sort_by: 'created_at' } },
    { provide: 'apiServiceSerializer', useClass: OrderSerializer }
  ]
})
export class DashboardLatestOrdersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  val = (row: Order) => row;
}
