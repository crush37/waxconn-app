import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-sales-summary',
  templateUrl: './dashboard-sales-summary.component.html',
})
export class DashboardSalesSummaryComponent implements OnInit {
  @Input() loading = false;
  @Input() totalSales: any;
  @Input() channelSales: any;

  constructor() {
  }

  ngOnInit(): void {

  }
}
