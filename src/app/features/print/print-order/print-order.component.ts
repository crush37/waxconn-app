import { AfterViewInit, Component } from '@angular/core';
import { OrderComponent, OrderSerializer } from "@features/orders/order/order.component";
import { ApiService } from "@core/services/api.service";

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'orders' },
    { provide: 'apiServiceOptions', useValue: { with: 'customer,addresses,items' } },
    { provide: 'apiServiceSerializer', useClass: OrderSerializer },
  ]
})
export class PrintOrderComponent extends OrderComponent implements AfterViewInit {
  appName!: string;
  intervalId: any;

  ngOnInit(): void {
    super.ngOnInit();

    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.appName = response.app.name;
    });
  }

  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      if (this.order) {
        clearInterval(this.intervalId);

        window.print();
        window.close();
      }
    }, 500);
  }
}
