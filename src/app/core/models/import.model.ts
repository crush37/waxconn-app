import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';

export class Import extends Resource {
  public lastImportAt!: string;
  public isImporting!: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ImportSerializer implements Serializer {
  fromJson(json: any): Import {
    const resource = new Import();
    resource.lastImportAt = json.last_import_at;
    resource.isImporting = json.is_importing;
    return resource;
  }

  toJson(resource: any): {} {
    return {
      channels: resource.channels
    };
  }
}
