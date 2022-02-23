import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe as BaseDatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  medium = 'MMM d, y HH:mm';
  timezoneOffset?: string;

  constructor(@Inject(LOCALE_ID) private locale: string, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.timezoneOffset = response.app.timezoneOffset;
    });
  }

  transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
    format = format ?? this.medium;
    timezone = timezone ?? this.timezoneOffset;
    return new BaseDatePipe(this.locale).transform(value, format, timezone, locale);
  }
}
