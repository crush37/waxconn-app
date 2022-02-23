import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class CustomerAddress extends Resource {
  public id!: string;
  public channelId!: string;
  public externalId!: string;
  public firstName!: string;
  public lastName!: string;
  public fullName!: string;
  public companyName!: string;
  public address1!: string;
  public address2!: string | null;
  public country!: string;
  public region!: string | null;
  public city!: string;
  public postcode!: string;
  public email!: string;
  public phone!: string | null;
  public default!: boolean;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressSerializer implements Serializer {
  fromJson(json: any): CustomerAddress {
    const resource = new CustomerAddress();
    resource.id = json.id;
    resource.channelId = json.channel_id;
    resource.externalId = json.external_id;
    resource.firstName = json.first_name;
    resource.lastName = json.last_name;
    resource.fullName = json.first_name + ' ' + json.last_name;
    resource.companyName = json.company_name;
    resource.address1 = json.address_1;
    resource.address2 = json.address_2;
    resource.country = json.country;
    resource.region = json.region;
    resource.city = json.city;
    resource.postcode = json.postcode;
    resource.phone = json.phone;
    resource.default = json.default;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: CustomerAddress): {} {
    return {};
  }
}
