import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Setting extends Resource {
  public id!: string;
  public name!: string;
  public locationId!: string;
  public hostname!: string;
  public apiKey!: string;
  public apiPassword!: string;
  public apiSharedSecret!: string;
  public taxable!: boolean;
  public isActive!: boolean;
  public publishByDefault!: boolean;
  public productUpdatesPolicy!: string;
  public deleteOutOfStockProducts!: boolean;
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
    resource.hostname = json.settings.api_hostname;
    resource.apiKey = json.settings.api_key;
    resource.apiPassword = json.settings.api_password;
    resource.apiSharedSecret = json.settings.api_shared_secret;
    resource.productUpdatesPolicy = json.settings.product_updates.policy;
    resource.taxable = json.taxable;
    resource.isActive = json.is_active;
    resource.publishByDefault = json.settings.publish_by_default;
    resource.deleteOutOfStockProducts = json.settings.delete_out_of_stock_products;

    return resource;
  }

  toJson(resource: any): any {
    return {
      id: resource.id,
      type: 'shopify',
      name: resource.name,
      location_id: resource.locationId,
      settings: {
        api_hostname: resource.hostname,
        api_key: resource.apiKey,
        api_password: resource.apiPassword,
        api_shared_secret: resource.apiSharedSecret,
        product_updates: {
          policy: resource.productUpdatesPolicy,
        },
        delete_out_of_stock_products: resource.deleteOutOfStockProducts,
        publish_by_default: resource.publishByDefault,
      },
      taxable: resource.taxable,
      is_active: resource.isActive,
    };
  }
}
