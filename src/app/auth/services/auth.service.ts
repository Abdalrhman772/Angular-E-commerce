import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: StorageService) {}

  getToken() {
    return this.storage.getStorage('token');
  }

  login(token: string) {
    this.storage.setStorage('token', token);
  }

  logout() {
    this.storage.clearStorage();
  }
}
