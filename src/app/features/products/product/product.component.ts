import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Product as BaseProduct, ProductSerializer as BaseProductSerializer } from '@core/models/product.model';
import { Listing, ListingSerializer } from '@core/models/listing.model';

export class Product extends BaseProduct {
  public listings!: Listing[] | null;
}

@Injectable()
export class ProductSerializer extends BaseProductSerializer {
  fromJson(json: any): Product {
    const resource = new Product();
    resource.listings = json.listings
      ? json.listings.map((listing: any) => new ListingSerializer().fromJson(listing))
      : null;

    return { ...super.fromJson(json), ...resource };
  }

  toJson(resource: any): {} {
    const json: any = {};
    json.listings = resource.listings
      ? resource.listings.map((listing: any) => new ListingSerializer().toJson(listing))
      : null;

    return { ...super.toJson(resource), ...json };
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'products' },
    { provide: 'apiServiceOptions', useValue: { with: 'listings,options,images' } },
    { provide: 'apiServiceSerializer', useClass: ProductSerializer },
  ]
})
export class ProductComponent implements OnInit {
  loading = false;
  title = 'Product';
  subTitle = 'View';

  id!: string;
  product!: Product;
  formGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Product>) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((product: Product) => {
          this.product = product;
          this.formGroup.setControl('id', new FormControl(product.id));
          this.formGroup.setControl('listings', new FormArray([]));
          this.loading = false;
        });
        this.formGroup.valueChanges.subscribe(form => {
          if (this.product.status === 'archived' && form.status === 'archived') {
            this.formGroup.markAsPristine();
          }
        })
      }
    });
  }
}
