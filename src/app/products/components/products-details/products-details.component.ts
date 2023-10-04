import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';

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
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.ID = this.myRoute.snapshot.params['id'];
    this.loading = true;

    this.getProductDetails();
  }

  getProductDetails() {
    this.productsService.productsSource.subscribe((product: any) => {
      console.log(product);
      if (product) {
        this.product = product;
        this.loading = false;
      } else {
        this.productsService.GetProductById(this.ID).subscribe({
          next: (data: any) => {
            this.product = data;
            console.log(data);
            this.loading = false;
          },
        });
      }
    });
  }

  addToCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.product.id == this.ID);
      if (exist) {
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
