import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/shared/srvices/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _Router:Router ,private _FormBuilder:FormBuilder , private _CheckoutService:CheckoutService){}

cartId:any='';
cartProductId:any='';
  login: FormGroup = this._FormBuilder.group({
    details: [
      '',
      [
        Validators.required
      ],
    ],
    phone: [
      '',
      [
        Validators.required
      ],
    ],
    city: [
      '',
      [
        Validators.required,
     ,
      ],
    ],
  });
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        
      this.cartId =  params.get('id');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onSubmit() {
    let loginValue=this.login.value;
    this._CheckoutService.checkout(this.cartId , loginValue).subscribe({
      next:(done)=>{
        if(done.status=="success"){
          window.open(done.session.url ,'_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

}
