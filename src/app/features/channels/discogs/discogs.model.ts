import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Release extends Resource {
  public id!: string;
  public artist!: string;
  public title!: string;
  public thumb!: string;
  public label!: string;
  public barcode!: string;
  public catalogNumber!: string;
  public companies!: { name: string, catalog: string, type: string }[];
  public identifiers!: { type: string, value: string, description: string }[];
  public format!: string;
  public type!: string;
  public country!: string;
  public year!: string;
  public released!: string;
  public videos!: { url: string, title: string, description: string | null, duration: string | null, embed: boolean }[] | null;
  public genres!: string[];
  public styles!: string[];
  public tracklist!: { position: number, type: string, title: string, duration: string | null }[];
  public images!: { type: string, src: string, thumb: string, width: string, height: string }[];
  public estimatedWeight!: number;
  public formatQuantity!: number;
  public numForSale!: number | null;
  public lowestPrice!: number;
  public externalUrl!: string;
  public notes!: string | null;
  public want!: number;
  public have!: number;
  public blockedFromSale!: boolean;
  public status!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReleaseSerializer implements Serializer {
  fromJson(json: any): Release {
    const resource = new Release();

    resource.id = json.id;
    resource.title = json.title;
    resource.artist = json.artist;
    resource.thumb = json.thumb;
    resource.label = json.label;
    resource.barcode = json.barcode;
    resource.catalogNumber = json.catalog_number;
    resource.companies = json.companies;
    resource.identifiers = json.identifiers;
    resource.format = json.format;
    resource.type = json.type;
    resource.country = json.country;
    resource.year = json.year;
    resource.released = json.released;
    resource.videos = json.videos;
    resource.genres = json.genres;
    resource.styles = json.styles;
    resource.tracklist = json.tracklist;
    resource.images = json.images;
    resource.estimatedWeight = json.estimated_weight;
    resource.formatQuantity = json.format_quantity;
    resource.numForSale = json.num_for_sale;
    resource.lowestPrice = json.lowest_price;
    resource.externalUrl = json.external_url;
    resource.notes = json.notes;
    resource.want = json.want;
    resource.have = json.have;
    resource.blockedFromSale = json.blocked_from_sale;
    resource.status = json.status;

    return resource;
  }

  toJson(resource: any): {} {
    return {
      channel_id: resource.channelId,
      release_id: resource.releaseId,
      barcode: resource.barcode,
      listings: resource.listings.map((listing: any) => {
        return { channel_id: listing };
      }),
      media_condition: resource.mediaCondition,
      sleeve_condition: resource.sleeveCondition,
      comments: resource.comments,
      private_comments: resource.privateComments,
      location: resource.location,
      price: resource.price,
      allow_offers: resource.allowOffers,
      taxable: resource.taxable,
      inventory: {
        available: resource.quantity,
        sku: resource.sku
      },
      currency: resource.currency,
      weight: resource.weight,
      format_quantity: resource.formatQuantity,
      status: resource.status
    };
  }
}

export class PriceSuggestion extends Resource {
  public data!: { currency: string, value: number };
}

@Injectable({
  providedIn: 'root'
})
export class PriceSuggestionSerializer implements Serializer {
  fromJson(json: any): PriceSuggestion {
    const resource = new PriceSuggestion();

    resource.data = json;

    return resource;
  }

  toJson(resource: any): {} {
    return {
      channel_id: resource.channelId,
      release_id: resource.releaseId,
      listings: resource.listings.map((listing: any) => {
        return { channel_id: listing };
      }),
      media_condition: resource.mediaCondition,
      sleeve_condition: resource.sleeveCondition,
      comments: resource.comments,
      private_comments: resource.privateComments,
      price: resource.price,
      currency: resource.currency,
      inventory: {
        available: resource.quantity,
        sku: resource.sku,
      },
      weight: resource.weight,
      format_quantity: resource.formatQuantity,
      status: resource.status
    };
  }
}

export class ReleaseList extends Resource {
  public id!: string;
  public thumb!: string;
  public title!: string;
  public catalog!: string;
  public format!: string;
  public country!: string;
  public year!: string | null;
  public externalUrl!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReleaseListSerializer implements Serializer {
  private static cleanup(arr: any): any {
    return arr.sort().filter((item: any, pos: any, ary: any) => !pos || item !== ary[pos - 1]);
  }

  fromJson(json: any): ReleaseList {
    const resource = new ReleaseList();

    resource.id = json.id;
    resource.thumb = json.thumb;
    resource.title = json.title;
    resource.catalog = json.catalog;
    resource.format = Array.isArray(json.format) ? ReleaseListSerializer.cleanup(json.format).join(', ') : json.format;
    resource.country = json.country;
    resource.year = json.year;
    resource.externalUrl = json.external_url;

    return resource;
  }

  toJson(resource: Resource): any {
    return {};
  }
}

export class Setting extends Resource {
  public id!: string;
  public type!: string;
  public name!: string;
  public locationId!: string;
  public apiUsername!: string;
  public apiToken!: string;
  public trackedShipmentTemplate!: string;
  public isActive!: boolean;
  public syncReleases!: boolean;
  public salesDisabled!: boolean;
  public publishByDefault!: boolean;
  public listingPolicy!: string;
  public listingPolicyQuantity!: number | null;
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
    resource.apiUsername = json.settings.api_username;
    resource.apiToken = json.settings.api_token;
    resource.trackedShipmentTemplate = json.settings.templates.tracked_shipment;
    resource.isActive = json.is_active;
    resource.syncReleases = json.syncs[0].is_active;
    resource.salesDisabled = json.settings.sales_disabled;
    resource.publishByDefault = json.settings.publish_by_default;
    resource.listingPolicy = json.settings.listings.policy;
    resource.listingPolicyQuantity = json.settings.listings.quantity;

    return resource;
  }

  toJson(resource: any): any {
    return {
      id: resource.id,
      type: 'discogs',
      name: resource.name,
      location_id: resource.locationId,
      settings: {
        api_username: resource.apiUsername,
        api_token: resource.apiToken,
        sales_disabled: resource.salesDisabled,
        publish_by_default: resource.publishByDefault,
        listings: {
          policy: resource.listingPolicy,
          quantity: resource.listingPolicyQuantity
        },
        templates: {
          tracked_shipment: resource.trackedShipmentTemplate
        }
      },
      is_active: resource.isActive,
      syncs: {
        releases: resource.syncReleases
      }
    };
  }
}
