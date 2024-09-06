import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';
import { loginData, UserData } from '../../interfaces/user-data';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

        // خطوات login
  // #1
  UserData: BehaviorSubject<any> = new BehaviorSubject(null);  // BehaviorSubject  => is a data type بناخد منها نسخة وهتشتغل لما اعمل referech
  // #2 in loginComponet.ts

  constructor(private _HttpClient:HttpClient, private _router:Router) {

    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem("userToken") !== null) {
        this.decodeUserData()
        _router.navigate([localStorage.getItem("currentPage")])
      }
    }

  }

  sendRegister(userData:UserData):Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`, userData)
  }


  sendLogin(userData:loginData):Observable<any> { //
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`, userData)
  }

  // #3
  decodeUserData() {
    // #4 in navbar.componet.ts

    // get token

    let token = localStorage.getItem('userToken');

    // decode جايه من jwt
    this.UserData.next(jwtDecode(JSON.stringify(token)));
    // console.log(this.UserData);

  }

                  // Forget Password

  // #1
  sendEmailApi(email:string):Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`, email)
  }

  // #2
  sendCodeApi(code:string):Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`, code)
  }

  // #3
  resetDataApi(userData:any):Observable<any> {
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`, userData)
  }

}
