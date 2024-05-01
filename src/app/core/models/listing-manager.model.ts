import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class ListingManager extends Resource {
  public channelId!: number;
  public fields!: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ListingManagerSerializer implements Serializer {
  fromJson(json: any): ListingManager {
    const resource = new ListingManager();
    resource.channelId = json.channel_id;
    resource.fields = json.fields;
    return resource;
  }

  toJson(resource: any): {} {
    return {
      channel_id: resource.channelId,
      fields: resource.fields,
    };
  }
}
