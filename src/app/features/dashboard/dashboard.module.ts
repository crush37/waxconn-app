import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardLatestOrdersListComponent } from './dashboard-latest-orders-list/dashboard-latest-orders-list.component';
import { DashboardSalesSummaryComponent } from './dashboard-sales-summary/dashboard-sales-summary.component';
import { DashboardSalesChartComponent } from './dashboard-sales-chart/dashboard-sales-chart.component';
import { DashboardTopCustomersListComponent } from './dashboard-top-customers-list/dashboard-top-customers-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardLatestOrdersListComponent,
    DashboardSalesSummaryComponent,
    DashboardSalesChartComponent,
    DashboardTopCustomersListComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
