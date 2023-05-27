import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() data: any;
  @Output() item = new EventEmitter();
  addBtn: boolean = false;
  amount: number = 1;

  addToCart() {
    this.item.emit({ product: this.data, quantity: this.amount });
  }
}
