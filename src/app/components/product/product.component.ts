import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { product } from 'src/app/product';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  constructor(private _ProductService:ProductService , private _CartService:CartService , private _WishlistService:WishlistService){} 

   products:product[]=[];
   wishlist:string[]=[]
   ngOnInit(): void {
    this._ProductService.getProduct().subscribe({
      next:(done)=>{
        this.products=done.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  success:string=""
  showToaster:boolean=false
  addToCart(id:string){
    this._CartService.addCart(id).subscribe({
      next:(done)=>{
        this.success=done.message ;        
        this._CartService.cartNumber.next(done.numOfCartItems)
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


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplayHoverPause:true,
    autoplay: true,
    autoplayTimeout:3000,
    autoplaySpeed: 2000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

}
