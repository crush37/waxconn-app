import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Setting extends Resource {
  public id!: string;
  public name!: string;
  public taxNumber!: string;
  public address1!: string;
  public address2!: string;
  public country!: string;
  public region!: string;
  public city!: string;
  public postcode!: string;
  public email!: string;
  public phone!: string;
  public language!: string;
  public timezone!: string;
  public currency!: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingSerializer implements Serializer {
  fromJson(json: any): Setting {
    const resource = new Setting();
    resource.name = json.data.name;
    resource.taxNumber = json.data.tax_number;
    resource.address1 = json.data.address_1;
    resource.address2 = json.data.address_2;
    resource.country = json.data.country;
    resource.region = json.data.region;
    resource.city = json.data.city;
    resource.postcode = json.data.postcode;
    resource.email = json.data.email;
    resource.phone = json.data.phone;
    resource.language = json.data.language;
    resource.timezone = json.data.timezone;
    resource.currency = json.data.currency;

    return resource;
  }

  toJson(resource: any): any {
    return {
      name: resource.name,
      tax_number: resource.taxNumber,
      address_1: resource.address1,
      address_2: resource.address2,
      country: resource.country,
      region: resource.region,
      city: resource.city,
      postcode: resource.postcode,
      email: resource.email,
      phone: resource.phone,
      language: resource.language,
      timezone: resource.timezone,
      currency: resource.currency
    };
  }
}
