import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Listing extends Resource {
  public id!: string;
  public productId!: string;
  public channelId!: string;
  public channelName!: string;
  public channelType!: string;
  public externalId!: string;
  public available!: number | null;
  public price!: number | null;
  public isLocked!: boolean;
  public policy!: boolean;
  public publishedAt!: string;
  public unpublishedAt!: string;
  public cancelReason!: string;
  public cancelledAt!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingSerializer implements Serializer {
  fromJson(json: any): Listing {
    const resource = new Listing();

    resource.id = json.id;
    resource.productId = json.product_id;
    resource.channelId = json.channel_id;
    resource.channelName = json.channel_name;
    resource.channelType = json.channel_type;
    resource.externalId = json.external_id;
    resource.available = json.available;
    resource.price = json.price;
    resource.isLocked = json.is_locked;
    resource.policy = json.policy;
    resource.publishedAt = json.published_at;
    resource.unpublishedAt = json.unpublished_at;
    resource.cancelReason = json.cancel_reason;
    resource.cancelledAt = json.cancelled_at;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;

    return resource;
  }

  toJson(resource: Listing): {} {
    return {
      id: resource.id,
      product_id: resource.productId,
      channel_id: resource.channelId,
      available: resource.available,
      price: resource.price,
      is_locked: resource.isLocked,
    };
  }
}
