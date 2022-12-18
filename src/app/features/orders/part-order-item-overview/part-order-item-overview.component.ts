import { Component, Input, OnInit } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from '../order-item/order-item.component';

@Component({
  selector: 'app-part-order-item-overview',
  templateUrl: './part-order-item-overview.component.html'
})
export class PartOrderItemOverviewComponent implements OnInit {
  @Input() orderItem!: OrderItem;

  currencyCode!: string;

  constructor(
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.currencyCode = getCurrencySymbol(response.app.currency, 'narrow');
    });
  }
}
