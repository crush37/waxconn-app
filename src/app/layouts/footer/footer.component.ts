import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PusherService} from "@core/services/pusher.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();

  status: string = 'available';
  message: string = 'All services available';

  links = [
    {href: 'https://www.waxconn.com/contact-us', text: 'Help'}
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pusherService: PusherService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      const channelName = response.app.app;

      this.status = response.app.discogsApiStatus.status;
      this.message = response.app.discogsApiStatus.message;

      this.pusherService.subscribe(channelName);
      this.pusherService.bind('api.status', (data: any) => {
        this.status = data.status;
        this.message = data.message;
      });
    });
  }
}
