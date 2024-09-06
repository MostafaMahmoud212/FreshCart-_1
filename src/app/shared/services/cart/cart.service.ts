import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken!:any

  //  هعمل عليه subscribe
  cartNum:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) {
    if (typeof window !== 'undefined' && localStorage) {
      this.myToken = {"token": localStorage.getItem('userToken')};
    }
  }

  addProductToCart(productId:string):Observable<any> {

    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/cart`,
      {
        "productId": productId,
      },
      // {
      //   headers: this.myToken // ال headers انا شايلها من الكل ومستخدم مكانها header.interceptor
      // }
    )
  }

  updateProductQuantity(productId:string ,count:string):Observable<any> {

    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/cart/${productId}`,
      {
        "count": count
      },
    )
  }

  getCart():Observable<any> {

    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/cart`,)
  }

  removeSpecItem(productId:string):Observable<any> {

    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart/${productId}`,)}


  clearCart():Observable<any> {

    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart`,)}
}
