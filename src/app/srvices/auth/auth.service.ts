import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  signUp(data:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , data )
  }

  signIn(data:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , data )
  }

  saveUserData(){
    if(localStorage.getItem('userToken') != null){
      let encode:any = localStorage.getItem('userToken');
      let decode = jwtDecode(encode);
      //console.log(decode);
    }
  }

  forgetPassword(data:object):Observable<any>{
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }

  sendCode(Code:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); //لتحديد نوع المحتوي ليكون json
    const data = { resetCode: Code }
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',JSON.stringify(data),{headers})
  }
  resetPAssword(data:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)

  }
}
