import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  constructor(public myService: ProductsService) {}

  products: any;
  categories: any;
  loading: boolean = false;
  cartProducts: any[] = [];

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  filterCategory(event: any) {
    // "target.value" get the value of the selected event (onChange)
    let selectedCategory = event.target.value;
    selectedCategory == 'All'
      ? this.getAllProducts()
      : this.getProductsCategory(selectedCategory);
    console.log(selectedCategory);
  }

  getAllProducts() {
    this.loading = true;
    this.myService.GetAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log(this.products);
      },
      error: (err) => {
        this.loading = false;
        alert(err);
        console.log(err);
      },
    });
  }

  getProductsCategory(category: string) {
    this.loading = true;
    this.myService.GetProductsByCategory(category).subscribe({
      next: (data) => {
        this.products = data; //products = new filtered products
        this.loading = false;
        console.log(this.products);
      },
      error: (err) => {
        this.loading = false;
        alert(err);
        console.log(err);
      },
    });
  }

  getCategories() {
    this.myService.GetAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addToCart(event: any) {
    console.log(event);
    
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => item.product.id == event.product.id);
      if (exist) {
        alert('exist');
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
