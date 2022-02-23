import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class OrderItem extends Resource {
  public id!: string;
  public productId!: string;
  public externalId!: string | null;
  public thumb!: string;
  public title!: string;
  public vendor!: string;
  public quantity!: number;
  public price!: number;
  public sku!: string;
  public location!: string;
  public totalDiscount!: number;
  public fulfillmentStatus!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderItemSerializer implements Serializer {
  fromJson(json: any): OrderItem {
    const resource = new OrderItem();
    resource.id = json.id;
    resource.productId = json.product_id;
    resource.externalId = json.external_id;
    resource.thumb = json.thumb;
    resource.title = json.title;
    resource.vendor = json.vendor;
    resource.quantity = json.quantity;
    resource.price = json.price;
    resource.sku = json.sku;
    resource.location = json.location;
    resource.totalDiscount = json.total_discount;
    resource.fulfillmentStatus = json.fulfillment_status;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: OrderItem): any {
    return {
      product_id: resource.productId,
      external_id: resource.externalId,
      title: resource.title,
      vendor: resource.vendor,
      quantity: resource.quantity,
      price: resource.price,
      total_discount: resource.totalDiscount,
      fulfillment_status: resource.fulfillmentStatus,
    };
  }
}
