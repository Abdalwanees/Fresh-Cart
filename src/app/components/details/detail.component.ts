import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/srvices/cart.service';
import { WishlistService } from 'src/app/shared/srvices/wishlist.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishlistService:WishlistService
  ) {}
  wishlist:string[]=[]
  idProduct: any = '';
  details: product = {} as product;
  success: string = '';
  showToaster: boolean = false;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        if (params.get('id') != null) {
          this.idProduct = params.get('id');
          this._ProductService.getDetails(this.idProduct).subscribe({
            next: (done) => {
              // console.log(done);
              this.details = done.data;
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }

  addToCart(id: string) {
    this._CartService.addCart(id).subscribe({
      next: (done) => {
        this.success = done.message;
        this._CartService.cartNumber.next(done.numOfCartItems);
        this.showToaster = true;
        setTimeout(() => {
          this.showToaster = false;
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
