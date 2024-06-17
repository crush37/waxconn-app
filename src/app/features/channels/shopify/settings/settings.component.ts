import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Setting, SettingSerializer } from '../shopify.model';
import { Location } from '@core/models/location.model';
import { ApiMetaService } from '@core/services/api-meta.service';
import { MatRadioChange } from '@angular/material/radio';
import { Editor, Toolbar } from "ngx-editor";
import { MatCheckboxChange } from "@angular/material/checkbox";

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
  loading = true;
  title = 'Shopify';
  subTitle = 'Settings';

  id!: string;
  settings!: Setting;
  formGroup!: FormGroup;

  locations!: Location[];
  productUpdatesPolicy!: string;

  selectedTags: string[] = [];

  productMetafields: { key: string, namespace: string, value: string, type: string }[] = [];

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
        this.getMetaData();
        this.apiService.get(this.id).subscribe((settings: Setting) => {
          this.settings = settings;
          this.productUpdatesPolicy = settings.productUpdatesPolicy;
          this.selectedTags = this.settings.productTagsTemplate;
          this.setFormGroup();
          this.setFormGroupMetafields();
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
    this.formGroup = new FormGroup<{}>({
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
      productTagsTemplate: new FormControl(this.selectedTags, Validators.required),
      productMetaTitleTemplate: new FormControl(this.settings?.productMetaTitleTemplate, Validators.required),
      productMetaDescriptionTemplate: new FormControl(this.settings?.productMetaDescriptionTemplate, Validators.required),
      productMetafields: new FormArray([])
    });
  }

  get productMetafieldsArray(): FormArray {
    return this.formGroup.controls['productMetafields'] as FormArray;
  }

  setFormGroupMetafields(): void {
    this.settings?.productMetafields?.forEach((metafield, index, object) => {
      this.productMetafieldsArray.push(this.createMetafieldFormGroup(metafield));
    });
  }

  addMetafield(): void {
    this.productMetafieldsArray.push(this.createMetafieldFormGroup());
  }

  removeMetafield(index: number): void {
    this.productMetafieldsArray.removeAt(index);
    this.formGroup.markAsDirty();
  }

  createMetafieldFormGroup(metafield?: any): FormGroup {
    return new FormGroup({
      key: new FormControl(metafield?.key ?? '', Validators.required),
      namespace: new FormControl(metafield?.namespace ?? '', Validators.required),
      value: new FormControl(metafield?.value ?? '', Validators.required),
      type: new FormControl(metafield?.type ?? 'single_line_text_field', Validators.required),
    });
  }

  selectTag(tag: string, event: MatCheckboxChange): void {
    const i = this.selectedTags.indexOf(tag);
    event.checked ?
      this.selectedTags.push(tag) :
      this.selectedTags.splice(i, 1);

    this.formGroup.patchValue({ productTagsTemplate: this.selectedTags });
    this.formGroup.get('productTagsTemplate')?.markAsDirty();
  }

  isTagChecked(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  toggleProductPolicy(event: MatRadioChange): void {
    this.productUpdatesPolicy = event.value;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
