import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from 'src/component/helpers/helper';

@Pipe({
  name: 'digitDate'
})
export class DigitDatePipe implements PipeTransform {

  transform(rawDate: Date): string {

    if (rawDate){

      let dt = new Date(rawDate)

      return Helper.digitDate(dt)
    }

    return ''
  }

}
