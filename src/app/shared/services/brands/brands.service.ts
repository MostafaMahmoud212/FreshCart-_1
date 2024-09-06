import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _htpClient:HttpClient) { }

  getAllBrands():Observable<any> {
    return this._htpClient.get(`${Environment.baseUrl}/api/v1/brands`)
  }

  getSpecificBrands(id:string | null):Observable <any> {
    return this._htpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

}
