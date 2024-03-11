import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Brand } from './../../product';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {


  constructor(private _ProductService:ProductService) { }

  brands:any[]=[];

  ngOnInit(): void {
  this._ProductService.getAllBrands().subscribe({
    next:(done)=>{
      this.brands = done.data
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

brandSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplayHoverPause:true,
  autoplay: true,
  autoplayTimeout:3000, 
  autoplaySpeed: 2000,
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
      items: 6
    }
  },
  nav: true
}


}
