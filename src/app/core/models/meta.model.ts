import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class Country implements Resource {
  public id!: string;
  public name!: string;
  public code!: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountrySerializer implements Serializer {
  fromJson(json: any): Country {
    const resource = new Country();
    resource.id = json.code;
    resource.name = json.name;
    resource.code = json.code.toLowerCase();
    return resource;
  }

  toJson(resource: any): {} {
    return {};
  }
}

export class Courier implements Resource {
  public id!: string;
  public name!: string;
  public url!: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourierSerializer implements Serializer {
  fromJson(json: any): Courier {
    const resource = new Courier();
    resource.id = json.id;
    resource.name = json.name;
    resource.url = json.url;
    return resource;
  }

  toJson(resource: any): {} {
    return {};
  }
}

export class Timezone implements Resource {
  public id!: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimezoneSerializer implements Serializer {
  fromJson(json: any): Timezone {
    const resource = new Timezone();
    resource.id = json;
    return resource;
  }

  toJson(resource: any): {} {
    return {};
  }
}
