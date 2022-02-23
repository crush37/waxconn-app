import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Setting extends Resource {
  public id!: string;
  public name!: string;
  public locationId!: string;
  public isActive!: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingSerializer implements Serializer {
  fromJson(json: any): Setting {
    const resource = new Setting();
    resource.id = json.id;
    resource.name = json.name;
    resource.locationId = json.location_id ? json.location_id.toString() : null;
    resource.isActive = json.is_active;

    return resource;
  }

  toJson(resource: any): any {
    return {
      id: resource.id,
      type: 'pos',
      name: resource.name,
      location_id: resource.locationId,
      settings: {
        foo: 'bar'
      },
      is_active: resource.isActive
    };
  }
}
