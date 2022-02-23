import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dashboard, DashboardSerializer } from '@core/models/dashboard.model';
import {
  Country,
  CountrySerializer,
  Courier,
  CourierSerializer,
  Timezone,
  TimezoneSerializer
} from '@core/models/meta.model';
import { Location, LocationSerializer } from '@core/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ApiMetaService {
  constructor(private httpClient: HttpClient) {
  }

  getDashboard(range: string): Observable<any> {
    return this.httpClient.get<Dashboard>('api/v1/dashboard/' + range).pipe(map((payload: any) => {
      return new DashboardSerializer().fromJson(payload.data);
    }));
  }

  getCountries(): Observable<any> {
    return this.httpClient.get<Country[]>('api/v1/meta/countries').pipe(map((payload: any) => {
      payload.data = payload.data.map((data: any) => new CountrySerializer().fromJson(data));
      return payload.data;
    }));
  }

  getCouriers(countryCode: string): Observable<any> {
    return this.httpClient.get<Courier[]>('api/v1/meta/couriers', {
      params: { country_code: countryCode }
    }).pipe(map((payload: any) => {
      payload.data = payload.data.map((data: any) => new CourierSerializer().fromJson(data));
      return payload.data;
    }));
  }

  getTimezones(): Observable<any> {
    return this.httpClient.get<Timezone[]>('api/v1/meta/timezones').pipe(map((payload: any) => {
      payload.data = payload.data.map((data: any) => new TimezoneSerializer().fromJson(data));
      return payload.data;
    }));
  }

  getLocations(): Observable<any> {
    return this.httpClient.get<Location[]>('api/v1/locations?sort_by=default').pipe(map((payload: any) => {
      payload.data = payload.data.map((data: any) => new LocationSerializer().fromJson(data));
      return payload.data;
    }));
  }
}
