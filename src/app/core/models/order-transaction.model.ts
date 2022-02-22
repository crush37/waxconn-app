import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class OrderTransaction implements Resource {
  public id!: string;
  public channelId!: string;
  public type!: string;
  public amount!: string;
  public processedAt!: string;
  public status!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderTransactionSerializer implements Serializer {
  fromJson(json: any): OrderTransaction {
    const resource = new OrderTransaction();
    resource.id = json.id;
    resource.channelId = json.channel_id;
    resource.type = json.type;
    resource.amount = json.amount;
    resource.status = json.status;
    resource.processedAt = json.processed_at;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: any): {} {
    return {
      order_id: resource.orderId,
      type: resource.type,
      amount: resource.amount
    };
  }
}
