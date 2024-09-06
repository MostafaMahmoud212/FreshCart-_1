import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _htpClient:HttpClient) { }

  getAllProducts():Observable<any> {
    return this._htpClient.get(`${Environment.baseUrl}/api/v1/products`)
  }
  getAllProductsHome():Observable<any> {
    return this._htpClient.get(`${Environment.baseUrl}/api/v1/products?limit=150&sort=-price`)
  }

  getSpecProduct(productId:string):Observable<any> {
    return this._htpClient.get(`${Environment.baseUrl}/api/v1/products/${productId}`)
  }
}
