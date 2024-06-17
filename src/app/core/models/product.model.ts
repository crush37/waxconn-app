import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Product extends Resource {
  public id!: string;
  public thumb!: string;
  public artist!: string;
  public title!: string;
  public listingTitle!: string;
  public description!: string;
  public metaTitle!: string;
  public metaDescription!: string;
  public type!: string;
  public quantity!: number;
  public price!: number;
  public taxable!: boolean;
  public barcode!: string;
  public sku!: string;
  public binLocation!: string;
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
      price: number,
      quantity: number,
      allowOffers: number,
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
    resource.artist = json.artist;
    resource.title = json.title;
    resource.listingTitle = json.listing_title;
    resource.description = json.description;
    resource.metaTitle = json.meta_title;
    resource.metaDescription = json.meta_description;
    resource.type = json.type;
    resource.quantity = json.quantity;
    resource.barcode = json.barcode;
    resource.sku = json.sku;
    resource.binLocation = json.bin_location;
    resource.price = json.price;
    resource.taxable = json.taxable;
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
          price: element.properties.price,
          quantity: element.properties.quantity,
          allowOffers: element.properties.allow_offers,
        }
      }
    })

    return resource;
  }

  toJson(resource: any): {} {
    return {
      id: resource.id,
      thumb: resource.thumb,
      listing_title: resource.listingTitle,
      description: resource.description,
      type: resource.type,
      barcode: resource.barcode,
      meta_title: resource.metaTitle,
      meta_description: resource.metaDescription,
      price: resource.price,
      taxable: resource.taxable,
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
          allow_offers: resource.allowOffers
        }
      },
      inventory: {
        available: resource.quantity,
        sku: resource.sku,
        bin_location: resource.binLocation,
      },
      channels: resource.channels,
    };
  }
}
