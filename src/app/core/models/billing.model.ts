import { Injectable } from '@angular/core';
import { Resource } from '@core/models/resource';
import { Serializer } from '@core/models/serializer.interface';
import { Setting, SettingSerializer } from '@core/models/setting.model';
import { Invoice, InvoiceSerializer } from '@core/models/invoice.model';

export class Billing extends Resource {
  public id!: string;
  public plan!: string;
  public settings!: Setting;
  public description!: string;
  public totalSubscription!: number;
  public totalChannels!: number;
  public totalDiscounts!: number;
  public totalFees!: number;
  public totalTax!: number;
  public total!: number;
  public pendingInvoice!: Invoice | null;
  public invoices!: Invoice[];
  public nextInvoiceAt!: string;
  public trial!: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BillingSerializer implements Serializer {
  fromJson(json: any): Billing {
    const resource = new Billing();
    resource.id = json.id;
    resource.plan = json.plan;
    resource.settings = new SettingSerializer().fromJson(json.settings);
    resource.description = json.description;
    resource.totalSubscription = json.total_subscription;
    resource.totalChannels = json.total_channels;
    resource.totalDiscounts = json.total_discounts;
    resource.totalFees = json.total_fees;
    resource.totalTax = json.total_tax;
    resource.total = json.total;
    resource.pendingInvoice = json.pending_invoice ? new InvoiceSerializer().fromJson(json.pending_invoice) : null;
    resource.invoices = json.invoices
      ? json.invoices.map((invoice: any) => new InvoiceSerializer().fromJson(invoice))
      : null;
    resource.nextInvoiceAt = json.next_invoice_at;
    resource.trial = json.trial;

    return resource;
  }

  toJson(resource: any): any {
    return {
    };
  }
}
