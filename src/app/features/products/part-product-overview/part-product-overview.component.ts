import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-part-product-overview',
  templateUrl: './part-product-overview.component.html'
})
export class PartProductOverviewComponent implements OnInit {
  @Input() product!: Product;
  @Input() formGroup!: FormGroup;

  ngOnInit(): void {
    this.setFormGroup();
  }

  setFormGroup(): void {
      this.formGroup.addControl('title', new FormControl(this.product.title));
      this.formGroup.addControl('vendor', new FormControl(this.product.vendor));
      this.formGroup.addControl('description', new FormControl(this.product.description));
      this.formGroup.addControl('mediaCondition', new FormControl(this.product.options.discogs?.mediaCondition));
      this.formGroup.addControl('sleeveCondition', new FormControl(this.product.options.discogs?.sleeveCondition));
      this.formGroup.addControl('comments', new FormControl(this.product.options.discogs?.comments));
      this.formGroup.addControl('privateComments', new FormControl(this.product.options.discogs?.privateComments));
      this.formGroup.addControl('location', new FormControl(this.product.options.discogs?.location));
      this.formGroup.addControl('metaTitle', new FormControl(this.product.metaTitle));
      this.formGroup.addControl('metaDescription', new FormControl(this.product.metaDescription));
  }
}
