import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '@core/models/customer.model';
import { OrderItem } from '@core/models/order-item.model';
import { DialogOrderCheckoutComponent } from '../dialog-order-checkout/dialog-order-checkout.component';
import { DialogDiscountComponent } from '@features/channels/pos/dialog-discount/dialog-discount.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  loading = false;
  title = 'POS Terminal';
  subTitle = 'New Order';
  formGroup = new UntypedFormGroup({});
  customer?: Customer;
  orderItems: OrderItem[] = [];
  totalDiscounts: number = 0;

  showCustomerSearch = false;
  showProductSearch = false;
  showShoppingCart = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setFormGroup();
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      channelId: new UntypedFormControl(),
      customerId: new UntypedFormControl(),
      email: new UntypedFormControl(),
      items: new UntypedFormControl(this.orderItems, Validators.minLength(1)),
      totalShipping: new UntypedFormControl(0),
      totalDiscounts: new UntypedFormControl(0),
      message: new UntypedFormControl(''),
      paymentStatus: new UntypedFormControl('paid'),
      fulfillmentStatus: new UntypedFormControl('fulfilled')
    });
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.formGroup.controls.channelId.setValue(
        response.app.channels.filter((item: any) => item.type === 'pos')[0].id
      );
    });
  }

  setCustomer(customer: Customer): void {
    this.customer = customer;
    this.formGroup.controls.customerId.patchValue(customer.id);
    this.formGroup.controls.email.patchValue(customer.email);
    this.showCustomerSearch = false;
  }

  searchCustomer(): void {
    this.showCustomerSearch = true;
  }

  searchProduct(): void {
    this.showProductSearch = true;
  }

  removeCustomer(): void {
    this.customer = undefined;
  }

  hideSearch(): void {
    this.showCustomerSearch = false;
    this.showProductSearch = false;
  }

  showCart(): void {
    this.showShoppingCart = true;
  }

  hideCart(): void {
    this.showShoppingCart = false;
  }

  emptyCart(): void {
    this.totalDiscounts = 0;
    this.formGroup.controls.totalDiscounts.patchValue(0);
  }

  openCheckoutDialog(): void {
    const dialogRef = this.dialog.open(DialogOrderCheckoutComponent, {
      panelClass: 'wax-dialog',
      width: '550px',
      height: '400px',
      autoFocus: false,
      data: { formGroup: this.formGroup }
    });

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.clearCart();
        this.hideCart();
        this.hideSearch();
      }
    });
  }

  openDiscountDialog(): void {
    const dialogRef = this.dialog.open(DialogDiscountComponent, {
      panelClass: 'wax-dialog',
      width: '550px',
      height: '400px',
      autoFocus: true,
      data: { formGroup: this.formGroup }
    });

    dialogRef.afterClosed().subscribe(formGroup => {
      if (formGroup) {
        this.formGroup = formGroup;
        this.totalDiscounts = formGroup.get('totalDiscounts').value;
      }
    });
  }

  clearCart(): void {
    this.customer = undefined;
    this.totalDiscounts = 0;
    this.orderItems = [];
    this.setFormGroup();
  }
}
