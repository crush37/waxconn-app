import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Setting extends Resource {
  public id!: string;
  public name!: string;
  public companyName!: string;
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
    resource.name = json.name;
    resource.companyName = json.company_name;
    resource.taxNumber = json.tax_number;
    resource.address1 = json.address_1;
    resource.address2 = json.address_2;
    resource.country = json.country;
    resource.region = json.region;
    resource.city = json.city;
    resource.postcode = json.postcode;
    resource.email = json.email;
    resource.phone = json.phone;
    resource.language = json.language;
    resource.timezone = json.timezone;
    resource.currency = json.currency;

    return resource;
  }

  toJson(resource: any): any {
    return {
      name: resource.name,
      company_name: resource.companyName,
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
