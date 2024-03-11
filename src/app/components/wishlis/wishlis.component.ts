import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-wishlis',
  templateUrl: './wishlis.component.html',
  styleUrls: ['./wishlis.component.css']
})
export class WishlisComponent {
  constructor(private _WishlistService:WishlistService , private _CartService:CartService) { }

  
  wishlist:any[]=[]
  success:string=""
  showToaster:boolean=false


 


  getWishlist():void {
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        console.log(response.data);
        
        this.wishlist = response.data

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
        this._WishlistService.getWishList().subscribe({
          next:(response)=>{
            console.log(response.data);
            
            this.wishlist = response.data
          }
        })
        
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  ngOnInit(): void {
    this.getWishlist()
  }
}
