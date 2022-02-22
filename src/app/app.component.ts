import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'waxconn-admin';

  constructor() {
    this.loadPaypalSDK();
  }

  loadPaypalSDK(): void {
    let node = document.createElement('script');
    node.src = 'https://www.paypal.com/sdk/js?client-id=' + environment.payPalClientId + '&currency=EUR';
    node.type = 'text/javascript';
    node.defer = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
