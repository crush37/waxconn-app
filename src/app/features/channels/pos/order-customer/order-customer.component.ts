import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Customer as BaseCustomer, CustomerSerializer as BaseCustomerSerializer } from '@core/models/customer.model';
import { CustomerAddress, CustomerAddressSerializer } from '@core/models/customer-address.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';

export class Customer extends BaseCustomer {
  public defaultAddress!: CustomerAddress | null;
}

@Injectable()
export class CustomerSerializer extends BaseCustomerSerializer {
  fromJson(json: any): Customer {
    const resource = new Customer();
    resource.defaultAddress = json.default_address
      ? new CustomerAddressSerializer().fromJson(json.default_address)
      : null;

    return { ...super.fromJson(json), ...resource };
  }
}

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'customers' },
    { provide: 'apiServiceOptions', useValue: { with: 'defaultAddress', per_page: 7 } },
    { provide: 'apiServiceSerializer', useClass: CustomerSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'customers' },
  ]
})
export class OrderCustomerComponent implements OnInit {
  search = true;
  searchConfig: SearchConfig = {
    appearance: 'outline',
    showFilterInput: true
  };
  formGroup!: FormGroup;

  @Output() customer = new EventEmitter<Customer>();
  @Output() hide = new EventEmitter<boolean>();

  constructor(
    private apiService: ApiService<Customer>,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      channelId: new FormControl(),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null),
      acceptsMarketing: new FormControl(false)
    });
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.formGroup.controls.channelId.setValue(
        response.app.channels.filter((item: any) => item.type === 'pos')[0].id
      );
    });
  }

  g = (row: Customer) => row;

  selectCustomer(customer: Customer): void {
    this.customer.emit(customer);
  }

  newCustomer(): void {
    this.search = false;
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.formGroup.disable();
    this.apiService.create(this.formGroup.getRawValue()).subscribe((customer: Customer) => {
      // this.dialogRef.close(customer);
    });
  }

  close(): void {
    this.hide.emit(true);
  }
}
