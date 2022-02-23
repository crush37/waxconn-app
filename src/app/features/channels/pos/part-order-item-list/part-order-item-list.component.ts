import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from '@core/models/order-item.model';

@Component({
  selector: 'app-part-order-item-list',
  templateUrl: './part-order-item-list.component.html'
})
export class PartOrderItemListComponent {
  @Input() items: OrderItem[] = [];
  @Output() hide = new EventEmitter<boolean>();

  item = (row: OrderItem) => row;

  remove(productId: string): void {
    this.items.map((item: OrderItem, index) => {
      if (item.productId === productId) {
        item.quantity--;
      }
      if (item.quantity === 0) {
        this.items.splice(index, 1);
      }
    })
  }

  close(): void {
    this.hide.emit(true);
  }
}
