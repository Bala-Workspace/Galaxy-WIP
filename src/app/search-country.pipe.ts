import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCountry'
})
export class SearchCountryPipe implements PipeTransform {

  transform(value: any[], args: any): unknown {
    debugger;
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });


  }

}
