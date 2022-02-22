import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
  @ContentChild('actions', { static: false }) actions!: TemplateRef<any>;
}
