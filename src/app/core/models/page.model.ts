import { Injectable } from '@angular/core';
import { Serializer } from '../models/serializer.interface';
import { Resource } from './resource';

export class Page extends Resource {
  public current!: number;
  public data!: any[];
  public size!: number;
  public total!: number;
}

@Injectable({
  providedIn: 'root'
})
export class PageSerializer implements Serializer {
  fromJson(json: any): Page {
    const resource = new Page();
    resource.current = json.current_page - 1;
    resource.data = json.data;
    resource.size = json.per_page;
    resource.total = json.total;
    return resource;
  }

  toJson(page: Page): {} {
    return {};
  }
}
