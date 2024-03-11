import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { product } from 'src/app/product';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService:ProductService ,private _CartService:CartService ,private _WishlistService:WishlistService ,private _Router:Router){} 

  success:string=""
  showToaster:boolean=false
   products:product[]=[];
   categories:any[]=[];
   wishlist:string[]=[];
   ngOnInit(): void {
    this._ProductService.getProduct().subscribe({
      next:(done)=>{
        console.log(done);
        this.products=done.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data;
        
      }
    });
 
    this._WishlistService.getWishList().subscribe({
      next:(done)=>{
         const data =done.data.map((item:any)=>item._id)
         this.wishlist=data;
      }
    });
  }
 
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
  categoryDetails(categoryId:string , categoryName:string):void {
    let body = {
      "categoryId":categoryId ,
      "categoryName":categoryName
    }
    this._Router.navigate(['/categoryDetails'],{state: {body}})
  }

  homeSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplayHoverPause:true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items:4
      }
    },
    nav: true
  }


  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    pullDrag: true,
    autoplayHoverPause:true,
    
    dots: true,
    navSpeed: 700,
    navText: ['previous', 'next'],
    items:1,
    nav: false
  }



  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['previous', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

}
