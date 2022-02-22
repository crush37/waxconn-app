import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Channel extends Resource {
  public id!: string;
  public name!: string;
  public discount!: string;
  public discountType!: string;
  public type!: string;
  public locationId!: string | null;
  public isActive!: boolean;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChannelSerializer implements Serializer {
  fromJson(json: any): Channel {
    const resource = new Channel();
    resource.id = json.id;
    resource.name = json.name;
    resource.discount = json.discount;
    resource.discountType = json.discount_type;
    resource.type = json.type;
    resource.locationId = json.location_id;
    resource.isActive = json.is_active;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: Resource): any {
  }
}
