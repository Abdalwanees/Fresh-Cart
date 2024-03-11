import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  
  constructor(private _ProductService:ProductService , private _CartService:CartService ,private _WishlistService:WishlistService){} 
  searchText:string='';
   products:product[]=[];
   success:string=""
   showToaster:boolean=false
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
}
