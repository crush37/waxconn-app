import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pos-create-order-button',
  templateUrl: './pos-create-order-button.component.html'
})
export class PosCreateOrderButtonComponent implements OnInit {
  display = false;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.display = response.app.channels.filter((channel: any) => channel.type === 'pos').length > 0;
    });
  }

}
