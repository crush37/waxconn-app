import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Setting, SettingSerializer } from '../shopify.model';
import { Location } from '@core/models/location.model';
import { ApiMetaService } from '@core/services/api-meta.service';
import { MatRadioChange } from '@angular/material/radio';
import { Editor, Toolbar } from "ngx-editor";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'channels' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: SettingSerializer },
  ]
})
export class SettingsComponent implements OnInit {
  loading = false;
  title = 'Shopify';
  subTitle = 'Settings';

  id!: string;
  settings!: Setting;
  formGroup = new FormGroup({});

  locations!: Location[];
  productUpdatesPolicy!: string;

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Setting>,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') ?? this.id;
        this.loading = true;
        this.getMetaData();
        this.apiService.get(this.id).subscribe((settings: Setting) => {
          this.settings = settings;
          this.productUpdatesPolicy = settings.productUpdatesPolicy;
          this.setFormGroup();
          this.loading = false;
        });

        this.editor = new Editor();
      }
    });
  }

  getMetaData(): void {
    this.apiMetaService.getLocations().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.settings?.name ?? 'Shopify'),
      locationId: new FormControl(this.settings?.locationId, Validators.required),
      hostname: new FormControl(this.settings?.hostname, Validators.required),
      apiKey: new FormControl(this.settings?.apiKey, Validators.required),
      apiPassword: new FormControl(this.settings?.apiPassword, Validators.required),
      apiSharedSecret: new FormControl(this.settings?.apiSharedSecret, Validators.required),
      isActive: new FormControl(this.settings?.isActive ?? false),
      taxable: new FormControl(this.settings?.taxable ?? false),
      publishByDefault: new FormControl(this.settings?.publishByDefault ?? true),
      deleteOutOfStockProducts: new FormControl(this.settings?.deleteOutOfStockProducts ?? false),
      productUpdatesPolicy: new FormControl(this.settings?.productUpdatesPolicy, Validators.required),
      productTitleTemplate: new FormControl(this.settings?.productTitleTemplate, Validators.required),
      productDescriptionTemplate: new FormControl(this.settings?.productDescriptionTemplate, Validators.required),
      productVendorTemplate: new FormControl(this.settings?.productVendorTemplate, Validators.required),
      productTagsTemplate: new FormControl(this.settings?.productTagsTemplate, Validators.required),
      productMetaTitleTemplate: new FormControl(this.settings?.productMetaTitleTemplate, Validators.required),
      productMetaDescriptionTemplate: new FormControl(this.settings?.productMetaDescriptionTemplate, Validators.required),
    });
  }

  toggleProductPolicy(event: MatRadioChange) {
    this.productUpdatesPolicy = event.value;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
