import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Product extends Resource {
  public id!: string;
  public thumb!: string;
  public title!: string;
  public description!: string;
  public metaTitle!: string;
  public metaDescription!: string;
  public type!: string;
  public quantity!: number;
  public price!: number;
  public sku!: string;
  public cost!: number;
  public currency!: string;
  public weight!: number;
  public vendor!: string;
  public inventoryCount!: number;
  public status!: string;
  public createdAt!: string;
  public updatedAt!: string;
  public images!: { src: string, thumb: string}[];
  public options!: {
    discogs?: {
      releaseId: string,
      mediaCondition: string,
      sleeveCondition: string,
      formatQuantity: number,
      comments: string,
      privateComments: string,
      location: string,
      price: number,
      quantity: number,
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductSerializer implements Serializer {
  fromJson(json: any): Product {
    const resource = new Product();
    resource.id = json.id;
    resource.thumb = json.thumb;
    resource.title = json.title;
    resource.description = json.description;
    resource.metaTitle = json.meta_title;
    resource.metaDescription = json.meta_description;
    resource.type = json.type;
    resource.quantity = json.quantity;
    resource.sku = json.sku;
    resource.price = json.price;
    resource.cost = json.cost;
    resource.currency = json.currency;
    resource.weight = json.weight;
    resource.vendor = json.vendor;
    resource.inventoryCount = json.inventory_count;
    resource.status = json.status;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;

    resource.images = [];
    json.images?.forEach(function (element: any) {
      resource.images.push({ src: element.src, thumb: element.src })
    });

    resource.options = {};
    json.options?.forEach(function (element: any) {
      if (element.type === 'discogs') {
        resource.options.discogs = {
          releaseId: element.properties.release_id,
          mediaCondition: element.properties.media_condition,
          sleeveCondition: element.properties.sleeve_condition,
          formatQuantity: element.properties.format_quantity,
          comments: element.properties.comments,
          privateComments: element.properties.private_comments,
          location: element.properties.location,
          price: element.properties.price,
          quantity: element.properties.quantity,
        }
      }
    })

    return resource;
  }

  toJson(resource: any): {} {
    return {
      id: resource.id,
      thumb: resource.thumb,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      meta_title: resource.metaTitle,
      meta_description: resource.metaDescription,
      price: resource.price,
      cost: resource.cost,
      weight: resource.weight,
      vendor: resource.vendor,
      status: resource.status,
      options: {
        discogs: {
          media_condition: resource.mediaCondition,
          sleeve_condition: resource.sleeveCondition,
          format_quantity: resource.formatQuantity,
          comments: resource.comments,
          private_comments: resource.privateComments,
          location: resource.location
        }
      },
      inventory: {
        available: resource.quantity,
        sku: resource.sku,
      },
    };
  }
}
