import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimePipe'
})
export class CustomTimePipePipe implements PipeTransform {
  
  transform(value: any, ...args: any[]): any {
    return moment(value, 'HH:mm').format('hh:mm A');
  }

}
