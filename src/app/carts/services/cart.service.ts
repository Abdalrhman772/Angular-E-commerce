import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private myClient: HttpClient, private shared: SharedService) {}

  private base_url = this.shared.base_url + 'carts';

  createNewCart(model: any) {
    return this.myClient.post(this.base_url, model);
  }
}
