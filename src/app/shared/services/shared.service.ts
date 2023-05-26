import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public base_url = 'https://fakestoreapi.com/';
  constructor() { }
}
