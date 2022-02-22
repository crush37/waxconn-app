import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class OrderFulfillment implements Resource {
  public id!: string;
  public courier!: string;
  public trackingUrl!: string;
  public trackingNumber!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderFulfillmentSerializer implements Serializer {
  fromJson(json: any): OrderFulfillment {
    const resource = new OrderFulfillment();
    resource.id = json.id;
    resource.courier = json.courier;
    resource.trackingUrl = json.tracking_url;
    resource.trackingNumber = json.tracking_number;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: any): {} {
    return {
      order_id: resource.orderId,
      courier: resource.courier,
      tracking_url: resource.trackingUrl ?? resource.otherTrackingUrl,
      tracking_number: resource.trackingNumber,
      notify_customer: resource.notifyCustomer
    };
  }
}
