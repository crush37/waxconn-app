import {Component, Inject, Input, LOCALE_ID} from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard-sales-chart',
  templateUrl: './dashboard-sales-chart.component.html'
})
export class DashboardSalesChartComponent {
  @Input() loading = false;
  @Input() barChartData!: ChartData <'bar', { key: string, value: number } []>;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartOptions: ChartConfiguration<'bar'>['options'];

  constructor(
      @Inject(LOCALE_ID) private locale: string,
      private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      let currencyCode = response.app.currency;

      Chart.defaults.font.family = 'Lato, "Helvetica Neue", sans-serif';
      Chart.defaults.color = '#000000';

      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            }
          },
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
            }
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat(locale, {style: 'currency', currency: currencyCode}).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      };
    });
  }
}
