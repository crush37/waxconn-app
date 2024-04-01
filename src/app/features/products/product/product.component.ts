import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
  formGroup = new UntypedFormGroup({});

  isPublishingListings: boolean = false;

  constructor(
    private router: Router,
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
          this.formGroup.setControl('id', new UntypedFormControl(product.id));
          this.formGroup.setControl('listings', new UntypedFormArray([]));
          this.setIsPublishingListings();
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

  setIsPublishingListings(): void {
    this.isPublishingListings = this.product.listings?.some((listing: Listing) => !listing.publishedAt) ?? false;
  }

  refreshPage() {
    // Get the current route URL
    const currentUrl = this.router.url;

    // Navigate to the same route
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
