import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number, discountPercentage: number): number {
    const discountAmount = value * (discountPercentage / 100);
    return value - discountAmount;
  }

}
