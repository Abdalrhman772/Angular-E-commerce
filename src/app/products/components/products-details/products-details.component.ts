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
}
