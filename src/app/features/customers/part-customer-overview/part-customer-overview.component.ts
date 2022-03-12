import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { itemPluralMapping } from '@core/i118n-plural-mapping';
import { Customer } from '../customer/customer.component';
import { DialogCustomerEditComponent } from '../dialog-customer-edit/dialog-customer-edit.component';

@Component({
  selector: 'app-part-customer-overview',
  templateUrl: './part-customer-overview.component.html'
})
export class PartCustomerOverviewComponent {
  @Input() customer!: Customer;
  itemPluralMapping = itemPluralMapping;

  constructor(protected dialog: MatDialog) {
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogCustomerEditComponent, {
      data: this.customer,
      width: '550px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        // need to resolve fullName again.
        next.fullName = (next.firstName) + (next.lastName
          ? ' ' + next.lastName
          : '');

        this.customer = { ...this.customer, ...next };
      }
    });
  }
}
