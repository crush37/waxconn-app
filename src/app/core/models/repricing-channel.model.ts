import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class RepricingChannel extends Resource {
  public id!: string;
  public repricingId!: string;
  public channelId!: string;
  public channelType!: string;
  public externalId!: string;
  public startedAt!: string;
  public completedAt!: string;
  public cancelledAt!: string;
  public totalListings!: number;
  public totalProcessed!: number;
  public msg!: boolean;
  public withFailures!: boolean;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepricingChannelSerializer implements Serializer {
  fromJson(json: any): RepricingChannel {
    const resource = new RepricingChannel();
    resource.id = json.id;
    resource.repricingId = json.repricing_id;
    resource.channelId = json.channel_id;
    resource.channelType = json.channel_type;
    resource.externalId = json.external_id;
    resource.startedAt = json.started_at;
    resource.completedAt = json.completed_at;
    resource.cancelledAt = json.cancelled_at;
    resource.totalListings = json.total_listings;
    resource.totalProcessed = json.total_processed;
    resource.withFailures = json.with_failures;
    resource.msg = json.msg;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: any): {} {
    return {};
  }
}
