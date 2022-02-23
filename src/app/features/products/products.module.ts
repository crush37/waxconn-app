import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PartProductOverviewComponent } from './part-product-overview/part-product-overview.component';
import { PartProductSummaryComponent } from './part-product-summary/part-product-summary.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    PartProductOverviewComponent,
    PartProductSummaryComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule {
}
