import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(totalPrice:number ,  discount:number  ): number{
    return totalPrice - discount;
  }

}
