import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/shared/srvices/checkout.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private _CheckoutService:CheckoutService) { }


orderData:any[]=[]
totalProductsPrice : number = 0;
numProduct: number = 6;

ngOnInit(): void {
    this._CheckoutService.getAllOrders().subscribe({
        next: (done) => {
            this.orderData = done.data;
            console.log(this.orderData);
            this.totalProductsPrice = this.orderData.slice(0, this.numProduct).reduce((total, order) => {
              return total + order.cartItems[0].price;
            }, 0);
        },
        error: (err) => {
            console.log(err);
        }
    });
}
}
