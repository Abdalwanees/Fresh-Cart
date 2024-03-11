import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offers'
})
export class OffersPipe implements PipeTransform {

  transform(value: number, discountPercent: number): number {
    const discountAmount = (discountPercent / 100) * value;
    return discountAmount;
  }
  }


