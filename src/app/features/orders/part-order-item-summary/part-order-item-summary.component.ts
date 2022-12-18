import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-part-order-item-summary',
  templateUrl: './part-order-item-summary.component.html'
})
export class PartOrderItemSummaryComponent implements OnInit {
  @Input() product!: Product;

  constructor() {
  }

  ngOnInit(): void {
  }
}
