import { Component, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Customer as BaseCustomer, CustomerSerializer as BaseCustomerSerializer } from '@core/models/customer.model';
import { CustomerAddress, CustomerAddressSerializer } from '@core/models/customer-address.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';
import { ApiMetaService } from '@core/services/api-meta.service';
import { saveAs } from 'file-saver';

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
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'customers' },
    { provide: 'apiServiceOptions', useValue: { with: 'defaultAddress' } },
    { provide: 'apiServiceSerializer', useClass: CustomerSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'customers' },
  ]
})
export class CustomerListComponent {
  title = 'Customers';
  subTitle = 'List';
  searchConfig: SearchConfig = {
    label: 'Filter Customers',
    appearance: 'outline',
    showFilterInput: true,
    selects: [
      {
        name: 'accepts_marketing', header: 'Type', default: 'all', multiple: false,
        options: [
          { text: 'All', value: 'all' },
          { text: 'Subscribers', value: 1 },
          { text: 'Non Subscribers', value: 0 }
        ]
      }
    ],
    withAutoRefresh: false,
  };
  exporting = false;

  constructor(
    private apiMetaService: ApiMetaService) {
  }

  g = (row: Customer) => row;

  getExport() {
    this.exporting = true;
    this.apiMetaService.getCustomersExport().subscribe(
      data => {
        let blob = new Blob([data], { type: 'application/text' });
        saveAs(blob, 'customers.csv');
        this.exporting = false;
      }
    );
  }
}
