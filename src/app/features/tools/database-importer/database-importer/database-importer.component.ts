import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Import, ImportSerializer } from '@core/models/import.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-database-importer',
  templateUrl: './database-importer.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'imports' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: ImportSerializer }
  ]
})
export class DatabaseImporterComponent implements OnInit {
  loading = false;
  title = 'Database Importer';
  subTitle = 'Bulk & Tools';

  channels!: any;
  isImporting = false;
  lastImportAt?: string;
  formGroup!: FormGroup;

  selectedChannels: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Import>) {
    this.setFormGroup();
  }

  val = (row: Import) => row;

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.channels = response.app.channels;
    });
    this.getImports();
  }

  getImports(): void {
    this.loading = true;
    this.apiService.index({}, false).subscribe((data: any) => {
      this.lastImportAt = data[0].lastImportAt;
      this.isImporting = data[0].isImporting;
      this.loading = false;
    });
  }

  setFormGroup(): void {
    this.formGroup = new FormGroup({
      channelDiscogs: new FormControl(null),
      channelShopify: new FormControl(null),
      channels: new FormControl(null)
    });
  }

  selectChannel(id: string, event: MatCheckboxChange): void {
    const i = this.selectedChannels.indexOf(id);
    event.checked ?
      this.selectedChannels.push(id) :
      this.selectedChannels.splice(i, 1);

    this.formGroup.get('channels')?.setValue(this.selectedChannels);
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.formGroup.disable();
    this.apiService.save(this.formGroup.getRawValue()).subscribe({
      next: () => {
        setTimeout(() => {
          this.formGroup.markAsPristine();
          this.formGroup.enable();
          this.getImports();
        }, 500);
      },
      error: () => {
        this.formGroup.enable();
      }
    });
  }
}
