import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  ID = 0;
  product: any;
  cartProducts: any[] = [];
  loading: boolean = false;

  constructor(
    private myRoute: ActivatedRoute,
    private myService: ProductsService
  ) {
    this.ID = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.loading = true;
    this.myService.GetProductById(this.ID).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert(err);
        console.log(err);
      },
    });
  }
  
  
  addToCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.product.id == this.ID);
      if (exist) {
        alert('exist');
        console.log(this.product);
      } else {
        this.cartProducts.push(this.product);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(this.product);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
