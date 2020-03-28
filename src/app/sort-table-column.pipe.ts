import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTableColumn'
})
export class SortTableColumnPipe implements PipeTransform {

  transform(value: any[], ...args: any): unknown {

    return value.sort((a, b) => {

      if (args[2] == 'name') {
        if (args[1]) {
          const bandA = a[args[0]].toUpperCase();
          const bandB = b[args[0]].toUpperCase();

          let comparison = 0;
          if (bandA > bandB) {
            comparison = 1;
          } else if (bandA < bandB) {
            comparison = -1;
          }
          return comparison;
        } else {
          const bandA = a[args[0]].toUpperCase();
          const bandB = b[args[0]].toUpperCase();

          let comparison = 0;
          if (bandA > bandB) {
            comparison = -1;
          } else if (bandA < bandB) {
            comparison = 1;
          }
          return comparison;
        }
      }
      if (args[2] == 'number') {
        debugger;
        if (args[1]) {
          return a[args[0]] - b[args[0]];
        } else {
          return b[args[0]] - a[args[0]];
        }
      }

    })
  }

}
