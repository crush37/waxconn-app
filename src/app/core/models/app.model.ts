import { Resource } from './resource';
import { Serializer } from './serializer.interface';
import { Injectable } from '@angular/core';
import { Location, LocationSerializer } from '@core/models/location.model';

export class App extends Resource {
  public id!: string;
  public app!: string;
  public name!: string;
  public language!: string;
  public timezone!: string;
  public timezoneOffset!: string;
  public currency!: string;
  public location!: Location | null;
  public channels!: {
    id: number;
    type: string;
    name: string;
    salesDisabled: boolean;
    publishByDefault: boolean;
    taxable: boolean;
    isActive: boolean;
  }[];
  public user!: {
    id: string,
    firstName: string;
    lastName: string;
    role: string;
  };
  public ready!: boolean;
  public quantities!: boolean;
  public repricing!: {
    operation: string,
    channels: string[]|string;
    createdAt: string;
  }|null;
  public listing!: boolean;
  public discogsApiStatus!: {
    status: string;
    message: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppSerializer implements Serializer {
  fromJson(json: any): Resource {
    const resource = new App();
    resource.id = json.id;
    resource.app = json.app;
    resource.name = json.name;
    resource.language = json.language;
    resource.timezone = json.timezone;
    resource.timezoneOffset = json.timezone_offset;
    resource.currency = json.currency;
    resource.location = json.location ? new LocationSerializer().fromJson(json.location) : null;
    resource.channels = [];
    json.channels?.forEach((channel: any) => {
      resource.channels.push({
        id: channel.id,
        type: channel.type,
        name: channel.name,
        salesDisabled: channel.sales_disabled,
        publishByDefault: channel.publish_by_default,
        taxable: channel.taxable,
        isActive: channel.is_active
      });
    });
    resource.user = {
      id: json.user.id,
      firstName: json.user.first_name,
      lastName: json.user.last_name,
      role: json.user.role
    };
    resource.ready = json.ready;
    resource.quantities = json.quantities;
    resource.repricing = json.repricing ? {
      operation: json.repricing.operation,
      channels: json.repricing.channels,
      createdAt: json.repricing.created_at,
    } : null;
    resource.listing = json.listing;
    resource.discogsApiStatus = {
      status: json.discogs_api_status.status,
      message: json.discogs_api_status.message,
    };

    return resource;
  }

  toJson(resource: Resource): {} {
    return {};
  }
}
