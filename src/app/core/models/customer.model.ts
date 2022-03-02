import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Customer extends Resource {
  public id!: string;
  public externalId!: string;
  public firstName!: string | null;
  public lastName!: string | null;
  public fullName!: string | null;
  public email!: string;
  public phone!: string | null;
  public ordersCount!: number;
  public amountSpent!: number;
  public acceptsMarketing!: boolean;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerSerializer implements Serializer {
  fromJson(json: any): Customer {
    const resource = new Customer();
    resource.id = json.id;
    resource.externalId = json.external_id;
    resource.firstName = json.first_name;
    resource.lastName = json.last_name;
    resource.fullName = (json.first_name) + (json.last_name
        ? ' ' + json.last_name
        : ''
    );
    resource.email = json.email;
    resource.phone = json.phone;
    resource.ordersCount = json.orders_count;
    resource.amountSpent = json.amount_spent;
    resource.acceptsMarketing = json.accepts_marketing;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: Customer): {} {
    return {
      id: resource.id,
      external_id: resource.externalId,
      first_name: resource.firstName,
      last_name: resource.lastName,
      email: resource.email,
      phone: resource.phone,
      accepts_marketing: resource.acceptsMarketing
    };
  }
}
