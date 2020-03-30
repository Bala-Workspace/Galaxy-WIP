import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCountry'
})
export class SearchCountryPipe implements PipeTransform {

  transform(value: any[], args: any): unknown {
    if (!value || !args) return value;
    args = args.toLowerCase();
    console.log(value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    }));
    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });


  }

}
