import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiMetaService } from '@core/services/api-meta.service';
import { Dashboard } from '@core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  subTitle = 'Home';

  loading = false;
  totalSales!: any;
  channelSales!: any[];
  chartSales!: any[];
  topCustomers!: any[];

  range!: string;
  ranges: any[] = [
    { name: 'Today', value: 'today' },
    { name: 'Yesterday', value: 'yesterday' },
    { name: 'Last 7 days', value: 'last-7-days' },
    { name: 'Last 30 days', value: 'last-30-days' }
  ];

  storageKey = 'dashboard.range';
  isAppReady = false;

  user!: {
    id: string,
    firstName: string,
    lastName: string,
    role: string
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.isAppReady = response.app.ready;
      this.user = response.app.user;

      const range = JSON.parse(localStorage.getItem(this.storageKey) ?? '"last-7-days"');
      this.getData(range);
    });
  }

  getData(range: string): void {
    this.range = this.ranges.find(i => i.value === range).name;
    this.loading = true;
    this.apiMetaService.getDashboard(range).subscribe((dashboard: Dashboard) => {
      localStorage.setItem(this.storageKey, JSON.stringify(range));
      this.totalSales = dashboard.totalSales;
      this.channelSales = dashboard.channelSales;
      this.chartSales = dashboard.chartSales;
      this.topCustomers = dashboard.topCustomers;
      this.loading = false;
    });
  }
}
