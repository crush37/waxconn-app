import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { Serializer } from './serializer.interface';

export class Dashboard extends Resource {
  public id!: string;
  public totalSales!: { count: string, total: number };
  public channelSales!: { name: string, count: string, total: number }[];
  public chartSales!: { key: string, value: number }[];
  public topCustomers!: {
    id: number,
    fullName: string,
    email: string,
    defaultAddress?: {
      city: string,
      country: string
    },
    ordersCount: number,
    amountSpent: number
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardSerializer implements Serializer {
  fromJson(json: any): Dashboard {
    const resource = new Dashboard();
    resource.id = json.id;
    resource.totalSales = {
      count: json.total_sales.count,
      total: json.total_sales.total
    };
    resource.chartSales = [];
    json.chart_sales?.forEach((day: any) => {
      resource.chartSales.push({
        key: day.label,
        value: day.total
      });
    });
    resource.channelSales = [];
    json.channel_sales?.forEach((channel: any) => {
      resource.channelSales.push({
        name: channel.name,
        count: channel.count,
        total: channel.total
      });
    });
    resource.topCustomers = [];
    json.top_customers?.forEach((customer: any) => {
      resource.topCustomers.push({
        id: customer.id,
        fullName: (customer.first_name) + (customer.last_name
            ? ' ' + customer.last_name
            : ''
        ),
        email: customer.email,
        defaultAddress: customer.default_address
          ? { city: customer.default_address?.city, country: customer.default_address?.country }
          : undefined,
        ordersCount: customer.orders_count,
        amountSpent: customer.amount_spent
      });
    });
    return resource;
  }

  toJson(resource: Dashboard): {} {
    return {};
  }
}
