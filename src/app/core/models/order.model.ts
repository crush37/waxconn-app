import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class Order extends Resource {
  public id!: string;
  public channelId!: string;
  public channelType!: string;
  public reference!: string;
  public externalId!: string;
  public customerId!: string;
  public customerName!: string | null;
  public email!: string;
  public subtotal!: number;
  public totalDiscounts!: number;
  public totalShipping!: number;
  public totalTax!: number;
  public total!: number;
  public currency!: string;
  public paymentStatus!: string;
  public fulfillmentStatus!: string;
  public message!: string | null;
  public cancelReason!: string | null;
  public cancelledAt!: string | null;
  public closedAt!: string | null;
  public createdAt!: string;
  public updatedAt!: string;
  public importedAt!: string | null;
  public itemsCount!: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderSerializer implements Serializer {
  fromJson(json: any): Order {
    const resource = new Order();
    resource.id = json.id;
    resource.channelId = json.channel_id;
    resource.channelType = json.channel_type;
    resource.reference = json.reference;
    resource.externalId = json.external_id;
    resource.customerId = json.customer_id;
    resource.customerName = json.customer_name;
    resource.email = json.email;
    resource.subtotal = json.subtotal;
    resource.totalDiscounts = json.total_discounts;
    resource.totalShipping = json.total_shipping;
    resource.totalTax = json.total_tax;
    resource.total = json.total;
    resource.currency = json.currency;
    resource.paymentStatus = json.payment_status;
    resource.fulfillmentStatus = json.fulfillment_status;
    resource.message = json.message;
    resource.cancelReason = json.cancel_reason;
    resource.cancelledAt = json.cancelled_at;
    resource.closedAt = json.closed_at;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    resource.importedAt = json.imported_at;
    resource.itemsCount = json.items_count;
    return resource;
  }

  toJson(resource: any): {} {
    return {
      id: resource.id,
      channel_id: resource.channelId,
      external_id: resource.externalId,
      customer_id: resource.customerId,
      email: resource.email,
      subtotal: resource.subtotal,
      total_discounts: resource.totalDiscounts,
      total_shipping: resource.totalShipping,
      total_tax: resource.totalTax,
      total: resource.total,
      currency: resource.currency,
      payment_status: resource.paymentStatus,
      fulfillment_status: resource.fulfillmentStatus,
      message: resource.message,
      cancel_reason: resource.cancelReason,
      is_archived: resource.isArchived,
      tracking_number: resource.trackingNumber,
      shipping_carrier: resource.shippingCarrier,
      tracking_url: resource.trackingUrl,
      notify_customer: resource.notifyCustomer
    };
  }
}
