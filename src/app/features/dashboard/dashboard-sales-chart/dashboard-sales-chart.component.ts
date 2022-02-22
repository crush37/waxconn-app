import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-sales-chart',
  templateUrl: './dashboard-sales-chart.component.html'
})
export class DashboardSalesChartComponent {
  @Input() loading = false;
  @Input() sales!: any;

  showXAxis = true;
  showYAxis = true;
  colorScheme= 'night';

  constructor() {
    Object.assign(this, this.sales)
  }

}
