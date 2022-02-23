import { Resource } from './resource';
import { Serializer } from './serializer.interface';
import { Injectable } from '@angular/core';
import { Location, LocationSerializer } from '@core/models/location.model';

export class App extends Resource {
  public id!: string;
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
}

@Injectable({
  providedIn: 'root'
})
export class AppSerializer implements Serializer {
  fromJson(json: any): Resource {
    const resource = new App();
    resource.id = json.id;
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

    return resource;
  }

  toJson(resource: Resource): {} {
    return {};
  }
}
