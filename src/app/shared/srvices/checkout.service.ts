import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _HttpClient:HttpClient) { }



  header:any={token: localStorage.getItem('userToken')}

  checkout(id:string , data:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
    {
      shippingAddress:data
    },
      {
        headers:this.header
      }

    )
    }

    cashout(id:string , data:object):Observable<any>{
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
      {
        shippingAddress:data
      },
        {
          headers:this.header
        }
  
      )
      }


    getAllOrders():Observable<any>{
      return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/orders')
    }

    getUserOrders(id:string):Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }


}
