import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { App, AppSerializer } from '@core/models/app.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppResolver implements Resolve<App> {
  public app!: App;

  constructor(
    private httpClient: HttpClient,
    private appSerializer: AppSerializer) {
  }

  resolve(): Observable<App> {
    return this.httpClient.get('api/v1/app').pipe(map(response => {
      return this.appSerializer.fromJson(response) as App;
    }));
  }
}
