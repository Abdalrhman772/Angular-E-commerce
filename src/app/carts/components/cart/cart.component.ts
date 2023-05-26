import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private myService: CartService) {}
  cartProducts: any[] = [];
  total = 0;
  success: boolean = false;

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log('products in cart' + this.cartProducts);
    this.getCartTotal();
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  minusAmount(index: number) {
    this.cartProducts[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  //set the quantity if user entered it manually not using the btn
  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  clearCart() {
    this.cartProducts = []; //empty array = empty cart!
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  //! don't forget after any update at the cart u need to do 2 things :
  //* 1- call getTotal to calc the new total
  //* 2- update localStorage
  getCartTotal() {
    this.total = 0;
    for (let i in this.cartProducts) {
      this.total +=
        this.cartProducts[i].product.price * this.cartProducts[i].quantity;
    }
  }

  addUserCart() {
    let userProducts = this.cartProducts.map((item) => {
      return { productId: item.product.id, quantity: item.quantity };
    });
    let Model = {
      userId: 5,
      date: new Date(),
      products: userProducts,
    };
    this.myService.createNewCart(Model).subscribe({
      next: () => {
        this.success = true;
      },
    });
    console.log(Model);
  }
}
