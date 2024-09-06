import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _htpClient:HttpClient) { }

  getAllCategories():Observable<any> {
    return this._htpClient.get(`${Environment.baseUrl}/api/v1/categories`)
  }

  getSpecificCategories(id:string | null):Observable <any> {
    return this._htpClient.get(`${Environment.baseUrl}/api/v1/categories/${id}`);
  }

}

