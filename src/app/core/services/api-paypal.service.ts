import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '@core/models/resource';

@Injectable({
  providedIn: 'root'
})
export class ApiPaypalService<T extends Resource> {
  constructor(private httpClient: HttpClient) {
  }

  createTransaction(invoiceId: string): Promise<any> {
    return this.httpClient.get<any>('api/v1/paypal/' + invoiceId + '/create').toPromise();
  }

  captureTransaction(invoiceId: string): Promise<any> {
    return this.httpClient.get<any>('api/v1/paypal/' + invoiceId + '/capture').toPromise();
  }

  // getOrder(id: string): Observable<any> {
  //   return this.httpClient.get<Order>('api/v1/orders/' + id).pipe(map((payload: any) => {
  //     return new OrderSerializer().fromJson(payload);
  //   }));
  // }
}
