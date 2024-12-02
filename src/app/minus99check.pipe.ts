import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minus99check'
})
export class WeatherErrorPipe implements PipeTransform {
  transform(value: any): string {
    return value === -99 ? '-99-(氣象站資料異常)' : value;
  }
}