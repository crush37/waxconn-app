import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe as BaseCurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  currency: string = 'EUR';

  constructor(@Inject(LOCALE_ID) private locale: string, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.currency = response.app.currency;
    });
  }

  transform(value: any, currencyCode?: any): string | null {
    return new BaseCurrencyPipe(this.locale).transform(value, currencyCode ?? this.currency);
  }
}
