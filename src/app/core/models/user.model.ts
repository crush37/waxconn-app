import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class User extends Resource {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public fullName!: string;
  public email!: string;
  public phone!: string;
  public language!: string;
  public role!: string;
  public isActive!: string;
  public emailVerifiedAt!: string;
  public createdAt!: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSerializer implements Serializer {
  fromJson(json: any): User {
    const resource = new User();
    resource.id = json.id;
    resource.firstName = json.first_name;
    resource.lastName = json.last_name;
    resource.fullName = json.first_name + ' ' + json.last_name;
    resource.email = json.email;
    resource.phone = json.phone;
    resource.language = json.language;
    resource.role = json.role;
    resource.isActive = json.is_active;
    resource.emailVerifiedAt = json.email_verified_at;
    resource.createdAt = json.created_at;
    return resource;
  }

  toJson(resource: User): any {
    return {
      id: resource.id,
      first_name: resource.firstName,
      last_name: resource.lastName,
      email: resource.email,
      phone: resource.phone,
      language: resource.language,
      role: resource.role
    };
  }
}
