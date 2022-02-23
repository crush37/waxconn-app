import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Invoice extends Resource {
  public id!: string;
  public externalId!: string;
  public description!: string;
  public total!: number;
  public link!: string;
  public paidAt!: string | null;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceSerializer implements Serializer {
  fromJson(json: any): Invoice {
    const resource = new Invoice();

    resource.id = json.id;
    resource.externalId = json.external_id;
    resource.description = json.description;
    resource.total = json.total;
    resource.link = json.link;
    resource.paidAt = json.paid_at;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;

    return resource;
  }

  toJson(resource: Invoice): {} {
    return {};
  }
}
