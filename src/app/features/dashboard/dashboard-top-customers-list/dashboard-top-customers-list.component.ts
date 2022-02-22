import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-customers-list',
  templateUrl: './dashboard-top-customers-list.component.html'
})
export class DashboardTopCustomersListComponent implements OnInit {
  @Input() loading = false;
  @Input() customers!: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
