import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() data: any;
  @Output() item = new EventEmitter();
  @Output() selectedProduct = new EventEmitter();
  addBtn: boolean = false;
  amount: number = 1;
  constructor(private router: Router) {}
  addToCart() {
    this.item.emit({ product: this.data, quantity: this.amount });
  }

  emitSelectedProduct() {
    console.log(22);
    this.selectedProduct.emit(this.data.id);
    this.router.navigate(['/details/'+ this.data.id])
  }
}
