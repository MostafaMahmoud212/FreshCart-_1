import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient) {}

  addProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/wishlist`,
      {
        productId: productId
      },
    );
  }
  getLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/wishlist`);
  }
  // Remove product from wishlist
  removeProductFromWishlist(productId:string):Observable<any> {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/wishlist/${productId}`);
  }
}


