import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash'; 

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.startCase(value).toUpperCase();;
  }

}
