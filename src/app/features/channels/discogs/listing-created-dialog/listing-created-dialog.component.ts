import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-created-dialog.component',
  templateUrl: './listing-created-dialog.component.html',
})
export class ListingCreatedDialogComponent implements OnInit {
  @Input() id!: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
