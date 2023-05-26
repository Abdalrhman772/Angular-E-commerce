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

  // addToCart(productId: any) {
  //   let cartItem = this.products[productId - 1];
  //   console.log(cartItem);

  //   if ('cart' in localStorage) {
  //     this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
  //     let exist = this.cartProducts.find((item) => item.id == productId);
  //     if (exist) {
  //       alert('exist');
  //     } else {
  //       this.cartProducts.push(cartItem);
  //       localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  //     }
  //   } else {
  //     this.cartProducts.push(cartItem);
  //     localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  //   }
  // }

  // addButton(event: any) {
  //   console.log(event.target);
  //   let btn = event.target;
  // }
}
