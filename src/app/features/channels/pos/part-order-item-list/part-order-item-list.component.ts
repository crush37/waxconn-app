import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from '@core/models/order-item.model';

@Component({
  selector: 'app-part-order-item-list',
  templateUrl: './part-order-item-list.component.html'
})
export class PartOrderItemListComponent {
  @Input() items: OrderItem[] = [];
  @Output() hide = new EventEmitter<boolean>();
  @Output() empty = new EventEmitter<boolean>();

  item = (row: OrderItem) => row;

  imagePlaceholder = './assets/default-placeholder.png';

  remove(productId: string): void {
    this.items.map((item: OrderItem, index) => {
      if (item.productId === productId) {
        item.quantity--;
      }
      if (item.quantity === 0) {
        this.items.splice(index, 1);
      }
    });
    if (this.items.length === 0) {
      this.empty.emit(true);
    }
  }

  close(): void {
    this.hide.emit(true);
  }

  onImgError(event: any){
    event.target.src = this.imagePlaceholder;
  }
}
