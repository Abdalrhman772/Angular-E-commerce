import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getStorage(key: string) {
    return localStorage.getItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}
