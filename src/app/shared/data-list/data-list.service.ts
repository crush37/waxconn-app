import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataListService {
  private source = new Subject<{}>();
  announced$ = this.source.asObservable();

  constructor(@Optional() @Inject('DataListServiceStorageKey') public storageKey?: string) {
  }

  announce(values: any, reset: boolean = false): void {
    this.source.next(values);
    if (reset) {
      this.resetStored();
    }
    this.storeValues(values);
  }

  startWith(values: {}): Observable<any> {
    return this.announced$.pipe(startWith(this.getStored() ?? values));
  }

  storeValues(values: {}): void {
    localStorage.setItem(this.storageKey + '.dataList', JSON.stringify(values));
  }

  getStored(param?: string): string | {} {
    const values = JSON.parse(localStorage.getItem(this.storageKey + '.dataList') ?? '{}');

    return param ? values[param] : values;
  }

  resetStored(): void {
    localStorage.removeItem(this.storageKey + '.dataList');
  }
}
