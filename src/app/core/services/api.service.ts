import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';
import { Page, PageSerializer } from '@core/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends Resource> {
  constructor(
    @Inject('apiServiceEndpoint') public endpoint: string,
    @Inject('apiServiceOptions') public defaultOptions: any,
    @Inject('apiServiceSerializer') public serializer: Serializer,
    private httpClient: HttpClient,
    private pageSerializer: PageSerializer) {
  }

  private makeQueryString(options: any): {} {
    if (options.page !== undefined) { options.page++; }
    Object.keys(options).forEach(key => {
      return (options[key] === '' || options[key] === undefined) && delete options[key];
    });
    return {...this.defaultOptions, ...options};
  }

  index(params: {}, paginate: boolean = true): Observable<any> {
    return this.httpClient.get <T[]>('api/v1/' + this.endpoint, {
      params: this.makeQueryString(params)
    }).pipe(map((payload: any) => {
      payload.data = payload.data.map((data: any) => this.serializer.fromJson(data) as T);
      return paginate ? this.pageSerializer.fromJson(payload) as Page : payload.data;
    }));
  }

  get(id: string, params: {} = {}): Observable<T> {
    return this.httpClient.get<T>('api/v1/' + this.endpoint + '/' + id, {
      params: this.makeQueryString(params)
    }).pipe(
      map((data: any) => {
        return this.serializer.fromJson(data) as T;
      })
    );
  }

  save(item: any): Observable<T | boolean> {
    if (!item.id) {
      return this.create(item);
    }
    return this.update(item);
  }

  create(item: any): Observable<T> {
    return this.httpClient.post<T>('api/v1/' + this.endpoint, this.serializer.toJson(item)).pipe(
      map((payload: any) => {
        return this.serializer.fromJson(payload) as T;
      })
    );
  }

  update(item: any): Observable<boolean> {
    return this.httpClient.put<boolean>('api/v1/' + this.endpoint + '/' + item.id, this.serializer.toJson(item));
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>('api/v1/' + this.endpoint + '/' + id);
  }
}
