import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Setting extends Resource {
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
    resource.name = json.app_name;
    resource.companyName = json.app_company_name;
    resource.taxNumber = json.app_tax_number;
    resource.address1 = json.app_address_1;
    resource.address2 = json.app_address_2;
    resource.country = json.app_country;
    resource.region = json.app_region;
    resource.city = json.app_city;
    resource.postcode = json.app_postcode;
    resource.email = json.app_email;
    resource.phone = json.app_phone;
    resource.language = json.app_language;
    resource.timezone = json.app_timezone;
    resource.currency = json.app_currency;

    return resource;
  }

  toJson(resource: any): any {
    return {
      app_name: resource.name,
      app_company_name: resource.companyName,
      app_tax_number: resource.taxNumber,
      app_address_1: resource.address1,
      app_address_2: resource.address2,
      app_country: resource.country,
      app_region: resource.region,
      app_city: resource.city,
      app_postcode: resource.postcode,
      app_email: resource.email,
      app_phone: resource.phone,
      app_language: resource.language,
      app_timezone: resource.timezone,
      app_currency: resource.currency
    };
  }
}
