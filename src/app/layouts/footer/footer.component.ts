import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  year: number = new Date().getFullYear();

  links = [
    { href: 'https://www.waxconn.com/contact-us', text: 'Help' }
  ];
}
