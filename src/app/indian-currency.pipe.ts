import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency'
})
export class IndianCurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    if (!value) {
      return '';
    }

    // Convert value to a string if it's a number
    let amount = value.toString();

    // Regular expression for Indian number system comma placement
    const x = amount.split('.');
    let integerPart = x[0];
    const decimalPart = x.length > 1 ? '.' + x[1] : '';

    // Format the integer part (1,23,45,678 format)
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(\d+)(\d{2})$/, '$1,$2');

    return integerPart + decimalPart;
  }
}
