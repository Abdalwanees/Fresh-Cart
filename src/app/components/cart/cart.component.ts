import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/product';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService , private _WishlistService:WishlistService) { }
  cartData:any={};
  price:number=0;
  totalPricee:number=0;
  totalPrice: number = 0;
  discountAmount: number = 0;
  totalAfterDiscount: number = 0;
  cartItem:number=0;
  cartId:string='';
  success:string="";
  showToaster:boolean=false;
  wishlist:string[]=[];
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(done)=>{
        this.cartData=done.data;
        this.cartItem=done.numOfCartItems;
        this.cartId=done.data._id 
  
        const pricesOver30 = done.data.products.filter((item: any) => item.price > 300);
        this.totalPrice = pricesOver30.reduce((acc: number, curr: any) => acc + curr.price, 0);
        this.discountAmount = (30 / 100) * this.totalPrice;
        this.totalAfterDiscount = this.totalPrice - this.discountAmount;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  removeFromCart(id:string):void{
    this._CartService.removeUserCart(id).subscribe({
      next:(done)=>{
        //console.log(done);
        this.cartData=done.data;
        this._CartService.cartNumber.next(done.numOfCartItems)
        this.cartItem=done.data.products.length;
        const pricesOver30 = done.data.products.filter((item: any) => item.price > 300);
        this.totalPrice = pricesOver30.reduce((acc: number, curr: any) => acc + curr.price, 0);
        this.discountAmount = (30 / 100) * this.totalPrice;
        this.totalAfterDiscount = this.totalPrice - this.discountAmount;

      },
      error:(err)=>{
        console.log(err);
      }
    })
 }

 changeCount(id:string , count:number){
  if(count>0){
   this._CartService.upDateItemCount(id , count).subscribe({
     next:(done)=>{
      //  console.log(done)
        this.cartData=done.data;
        const pricesOver30 = done.data.products.filter((item: any) => item.price > 300);
        this.totalPrice = pricesOver30.reduce((acc: number, curr: any) => acc + curr.price, 0);
        this.discountAmount = (30 / 100) * this.totalPrice;
        this.totalAfterDiscount = this.totalPrice - this.discountAmount;
     
     },
     error:(err)=>{
       console.log(err)
     }
  })
  }
 }

 clrearCart():void{
  this._CartService.clearItem().subscribe({
    next:(done)=>{
     // console.log(done);
      if(done.message=="success"){
        this.cartData={};
        this.cartItem = 0;
        this._CartService.cartNumber.next(0)
        const pricesOver30 = done.data.products.filter((item: any) => item.price > 300);
        this.totalPrice = pricesOver30.reduce((acc: number, curr: any) => acc + curr.price, 0);
        this.discountAmount = (30 / 100) * this.totalPrice;
        this.totalAfterDiscount = this.totalPrice - this.discountAmount;
        this.cartItem = 0;
      }
    },
    error:(err)=>{
      console.log(err);
    }
  })
 }



 addToWishList(id:string){
  this._WishlistService.addToWishlist(id).subscribe({
    next:(done)=>{
      this.wishlist=done.data
      this.success=done.message ;        
      this.showToaster=true
      setTimeout(() => {
        this.showToaster=false
      }, 2000);
      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

deleteItem(id:string):void{
  this._WishlistService.removeWishList(id).subscribe({
    next:(done)=>{
      this.wishlist=done.data;
      
    },
    error:(err)=>{
      console.log(err)
    }

  })
}

 
}
