import { Pipe, PipeTransform } from '@angular/core';
import { product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: product[], searchText: string): product[] {
    return items.filter((product:product) => product.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
