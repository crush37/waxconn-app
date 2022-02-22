import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Output() listItemClick = new EventEmitter();

  isAdmin = false;
  path = '';
  displayPos = false;
  links: { href: string, icon: string, text: string }[] = [];
  linksList: any = {
    main: [
      { href: '/products', icon: 'album', text: 'Products' },
      { href: '/orders', icon: 'shopping_cart', text: 'Orders' },
      { href: '/customers', icon: 'people', text: 'Customers' },
    ],
    system: [
      // { href: '/system/settings', icon: 'settings_input_component', text: 'Settings' },
      { href: '/system/general', icon: 'admin_panel_settings', text: 'General' },
      { href: '/system/locations', icon: 'storefront', text: 'Locations' },
      { href: '/system/channels', icon: 'grid_view', text: 'Sales Channels' },
      { href: '/system/billing', icon: 'account_balance', text: 'Billing' },
      { href: '/system/users', icon: 'people_alt', text: 'Users' },
      { href: '/tools', icon: 'handyman', text: 'Bulk & Tools' },
    ],
    tools: [
      { href: '/tools/repricing-agent', icon: 'refresh', text: 'Repricing Agent' },
      { href: '/tools/database-importer', icon: 'download', text: 'Database Importer' },
      // { href: '/tools/listings-publisher', icon: 'upload', text: 'Listings Publisher' },
    ],
    channels: [
      { href: '/channels/discogs', icon: 'device_hub', text: 'Discogs' },
    ]
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.displayPos = response.app.channels.filter((channel: any) => channel.type === 'pos').length > 0;
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.path = router.url.split('/')[1];
        this.links = this.linksList[this.path] ?? this.linksList.main;
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.isAdmin = response.app.user.role === 'admin';
    });
  }
}
