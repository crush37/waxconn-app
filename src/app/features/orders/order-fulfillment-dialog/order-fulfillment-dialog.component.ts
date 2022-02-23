import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from '@core/services/api.service';
import { ApiMetaService } from '@core/services/api-meta.service';
import { OrderFulfillment, OrderFulfillmentSerializer } from '@core/models/order-fulfillment.model';
import { Courier } from '@core/models/meta.model';

export interface DialogData {
  orderId: string;
  channelType: string;
}

@Component({
  selector: 'app-order-fulfillment-dialog',
  templateUrl: './order-fulfillment-dialog.component.html',
  providers: [
    ApiMetaService,
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'fulfillments' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: OrderFulfillmentSerializer }
  ]
})
export class OrderFulfillmentDialogComponent implements OnInit {
  loading = false;
  formGroup!: FormGroup;
  showOtherTrackingUrl = false;
  couriers!: Courier[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMetaService: ApiMetaService,
    private apiService: ApiService<OrderFulfillment>,
    public dialogRef: MatDialogRef<OrderFulfillmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.getCouriers(response.app.location.countryCode);
    });
    this.formGroup = new FormGroup({
      courier: new FormControl(),
      trackingUrl: new FormControl(),
      otherTrackingUrl: new FormControl(),
      trackingNumber: new FormControl(),
      notifyCustomer: new FormControl(true)
    });
  }

  getCouriers(countryCode: string): void {
    this.apiMetaService.getCouriers(countryCode).subscribe((couriers: Courier[]) => {
      this.couriers = couriers;
    });
  }

  onCourierSelect(event: MatSelectChange): void {
    this.showOtherTrackingUrl = event.value === 'other';
    if (!this.showOtherTrackingUrl) {
      const courier = this.couriers.find((courier) => { return courier.name === event.value });
      this.formGroup.get('trackingUrl')?.patchValue(courier?.url);
    }
  }

  submitForm(): boolean {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return false;
    }
    this.formGroup.disable();
    this.apiService.save({ orderId: this.data.orderId, ...this.formGroup.getRawValue() }).subscribe(() => {
      this.dialogRef.close(true);
    }, () => {
      this.formGroup.enable();
    });

    return true;
  }
}
