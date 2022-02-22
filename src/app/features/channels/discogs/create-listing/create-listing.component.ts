import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { DataListService } from '@shared/data-list/data-list.service';
import { Release, ReleaseSerializer } from '../discogs.model';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'discogs/releases' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: ReleaseSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'discogs' },
  ]
})
export class CreateListingComponent implements OnInit {
  loading = false;
  importing = false;
  title = 'Create Product';
  subTitle = 'Discogs';

  id!: string;
  release!: Release;
  formGroup = new FormGroup({});

  mediaCondition = new EventEmitter<string>();
  skuError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<Release>,
    private dataListService: DataListService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if ((params.get('id') || this.id) && !this.importing) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((release: Release) => {
          this.release = release;
          this.formGroup.setControl('releaseId', new FormControl(release.id));
          this.loading = false;
        }, (error) => {
          if (error.status === 423) {
            this.importing = true;
            this.loading = false;
          }
        });
      }
    });
  }

  onPartChanges(formGroup: FormGroup): void {
    this.formGroup = new FormGroup({ ...this.formGroup.controls, ...formGroup.controls });
  }

  onMediaConditionChange(value: string): void {
    this.mediaCondition.emit(value);
  }

  markAsVisited(): void {
    const stored: any = this.dataListService.getStored();
    const visited: string[] = stored.visited ?? [];
    visited.push(this.release.id);

    this.dataListService.storeValues({ ...stored, visited });
  }
}
