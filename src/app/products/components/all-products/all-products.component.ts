import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(
    private myRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  allProducts: any;
  products: any;
  categories: any;
  loading: boolean = false;
  cartProducts: any[] = [];
  ID = 0;

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  filterCategory(event: any) {
    // "target.value" get the value of the selected event (onChange)
    let selectedCategory = event.target.value;
    selectedCategory == 'All'
      ? (this.products = this.allProducts)
      : this.getProductsCategory(selectedCategory);
    console.log(selectedCategory);
  }

  getAllProducts() {
    this.loading = true;
    this.productsService.GetAllProducts().subscribe({
      next: (data: any) => {
        this.allProducts = data;
        this.products = data;
        this.loading = false;
        console.log(this.allProducts);
      },
      error: (err: any) => {
        this.loading = false;
        alert(err);
        console.log(err);
      },
    });
  }

  getProductsCategory(category: string) {
    let res = this.allProducts.filter(
      (item: any) => item.category === category
    );
    this.products = res;
    console.log(res);
  }

  getCategories() {
    this.productsService.GetAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      error(err: any) {
        console.log(err);
      },
    });
  }

  getProductDetails(productId: number) {
    console.log(444);
    const selectedProduct = this.allProducts.filter(
      (item: any) => item.id == productId
    )[0]
    console.log('selectedProduct', selectedProduct);
    this.productsService.productsSource.next(selectedProduct);
  }

  addToCart(event: any) {
    console.log(event);

    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.product.id == event.product.id
      );
      if (exist) {
        console.log('exist');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
