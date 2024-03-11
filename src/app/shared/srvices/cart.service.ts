import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }


  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  header:any={token: localStorage.getItem('userToken')}

addCart(id:string):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:id},{headers:this.header})
}

getUserCart():Observable<any>{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:this.header})
}

removeUserCart(id:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:this.header})
}


clearItem():Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:this.header}) 
 }

 upDateItemCount(id:string , count:number):Observable<any>{
   return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
   {
     "count": count
   },
   {headers:this.header}
  
 )
 }
   
}
