import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private myClient: HttpClient, private shared: SharedService) {}
  private base_url = this.shared.base_url + 'products';

  GetAllProducts() {
    return this.myClient.get(this.base_url);
  }

  GetAllCategories() {
    return this.myClient.get(this.base_url + '/categories');
  }

  GetProductsByCategory(category: string) {
    return this.myClient.get(this.base_url + '/category/' + category);
  }

  GetProductById(id: any) {
    return this.myClient.get(this.base_url + '/' + id);
  }
}
