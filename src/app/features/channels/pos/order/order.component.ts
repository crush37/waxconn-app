import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '@core/models/customer.model';
import { OrderItem } from '@core/models/order-item.model';
import { DialogOrderCheckoutComponent } from '../dialog-order-checkout/dialog-order-checkout.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  loading = false;
  title = 'POS Terminal';
  subTitle = 'New Order';
  formGroup = new FormGroup({});
  customer?: Customer;
  orderItems: OrderItem[] = [];

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
    this.formGroup = new FormGroup({
      channelId: new FormControl(),
      customerId: new FormControl(),
      email: new FormControl(),
      items: new FormControl(this.orderItems, Validators.minLength(1)),
      totalShipping: new FormControl(0),
      totalDiscounts: new FormControl(0),
      message: new FormControl(''),
      paymentStatus: new FormControl('paid'),
      fulfillmentStatus: new FormControl('fulfilled')
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

  clearCart(): void {
    this.customer = undefined;
    this.orderItems = [];
    this.setFormGroup();
  }
}
