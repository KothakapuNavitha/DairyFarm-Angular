import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIndianCurrency]'
})
export class IndianCurrencyDirective {

  constructor(private el: ElementRef) { }

  // Listen to input events on the element
  @HostListener('input', ['$event']) onInputChange(event: any): void {
    const input = this.el.nativeElement;
    let inputValue = input.value.replace(/[₹,]/g, ''); // Remove commas and ₹ symbol

    // If input is a valid number, format it to Indian currency style
    if (!isNaN(inputValue) && inputValue !== '') {
      inputValue = this.formatCurrency(inputValue);
      input.value = inputValue;  // Set formatted value back to the input
    } else {
      input.value = ''; // Reset to empty if input is invalid
    }
  }

  // Function to format number as currency with commas (Indian format)
  private formatCurrency(value: string): string {
    let integerPart = value.split('.')[0];  // Get the integer part
    const decimalPart = value.includes('.') ? '.' + value.split('.')[1] : '';  // Get decimal part if exists

    // Add commas in Indian style (starting from the right for every 2 digits after the first 3)
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Return with the rupee symbol and formatted value
    return '₹ ' + integerPart + decimalPart;
  }

}
