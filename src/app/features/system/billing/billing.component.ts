import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Billing, BillingSerializer } from '@core/models/billing.model';
import { ApiPaypalService } from '@core/services/api-paypal.service';
import { Invoice } from '@core/models/invoice.model';

declare var paypal: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'billing' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: BillingSerializer },
  ]
})
export class BillingComponent implements OnInit {
  loading = false;
  title = 'Billing';
  subTitle = 'Settings';

  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  billing!: Billing;
  hasPendingPayment = false;
  isPaid = false;
  paymentError = false;

  constructor(
    private apiService: ApiService<Billing>,
    private apiPayPalService: ApiPaypalService<Invoice>) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.index({}, false).subscribe((billing: Billing[]) => {
      this.isPaid = false;
      this.billing = billing[0];
      this.hasPendingPayment = !!this.billing.pendingInvoice;
      this.loading = false;
      this.loadPaypalOrder();
    });
  }

  loadPaypalOrder(): void {
    paypal.Buttons({
      style: { label: 'pay', layout: 'horizontal', size: 'medium', height: 36, tagline: false },
      createOrder: () => {
        return this.apiPayPalService.createTransaction(this.billing.pendingInvoice!.id).then(paymentId => {
          return paymentId;
        });
      },
      onApprove: () => {
        return this.apiPayPalService.captureTransaction(this.billing.pendingInvoice!.id).then(status => {
          this.hasPendingPayment = false;
          this.isPaid = status === 'completed';
        });
      },
      onError: () => {
        this.paymentError = true;
      }
    }).render(this.paypalElement.nativeElement);
  }
}
