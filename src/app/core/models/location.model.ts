import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Location extends Resource {
  public id!: string;
  public type!: string;
  public name!: string;
  public address1!: string;
  public address2!: string;
  public country!: string;
  public countryCode!: string;
  public region!: string;
  public city!: string;
  public postcode!: string;
  public phone!: string;
  public default!: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocationSerializer implements Serializer {
  fromJson(resource: any): Location {
    const location = new Location();
    location.id = resource.id;
    location.name = resource.name;
    location.address1 = resource.address_1;
    location.address2 = resource.address_2;
    location.country = resource.country;
    location.countryCode = resource.country_code;
    location.region = resource.region;
    location.city = resource.city;
    location.postcode = resource.postcode;
    location.phone = resource.phone;
    location.default = resource.default;
    return location;
  }

  toJson(resource: any): any {
    return {
      id: resource.id,
      name: resource.name,
      address_1: resource.address1,
      address_2: resource.address2,
      country: resource.country,
      country_code: resource.countryCode,
      region: resource.region,
      city: resource.city,
      postcode: resource.postcode,
      phone: resource.phone,
      default: resource.default
    };
  }
}
