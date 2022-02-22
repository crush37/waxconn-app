import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Repricing extends Resource {
  public id!: string;
  public operation!: string;
  public type!: string;
  public operator!: string;
  public value!: string;
  public discountType!: string;
  public rounding!: string | null;
  public startedAt!: string;
  public completedAt!: string;
  public cancelledAt!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepricingSerializer implements Serializer {
  fromJson(json: any): Repricing {
    const resource = new Repricing();
    resource.id = json.id;
    resource.operation = json.operation;
    resource.type = json.type;
    resource.operator = json.operator;
    resource.value = json.value;
    resource.discountType = json.discount_type;
    resource.rounding = json.rounding;
    resource.startedAt = json.started_at;
    resource.completedAt = json.completed_at;
    resource.cancelledAt = json.cancelled_at;
    resource.createdAt = json.created_at;
    resource.updatedAt = json.updated_at;
    return resource;
  }

  toJson(resource: any): {} {
    return {
      operation: resource.operation,
      type: resource.type,
      channels: resource.channels,
      operator: resource.operator,
      value: resource.value,
      discount_type: resource.discountType,
      rounding: resource.rounding
    };
  }
}
