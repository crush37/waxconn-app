import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiMetaService } from '@core/services/api-meta.service';
import { Release } from '@features/channels/discogs/discogs.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-part-listing-overview',
  templateUrl: './part-listing-overview.component.html'
})
export class PartListingOverviewComponent implements OnInit {
  @Input() release!: Release;
  @Output() values = new EventEmitter<UntypedFormGroup>();
  @Output() mediaCondition = new EventEmitter<string>();

  formGroup!: UntypedFormGroup;
  appName!: string;

  imagePlaceholder: { type: string, src: string, thumb: string, width: string, height: string }[] = [{
    type: '',
    src: './assets/default-placeholder.png',
    thumb: './assets/default-placeholder.png',
    width: '1500',
    height: '1500',
  }];

  commentsOptions: string[] = [];
  locationsOptions: string[] = [];

  filteredCommentsOptions!: Observable<string[]>;
  filteredLocationsOptions!: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.appName = response.app.name;
    });

    this.getCommentsOptions();
    this.getLocationsOptions();
    this.setFromGroup();

    this.filteredCommentsOptions = this.formGroup.controls.comments.valueChanges.pipe(
      map(value => this.filterComments(value || '')),
    );

    this.filteredLocationsOptions = this.formGroup.controls.location.valueChanges.pipe(
      map(value => this.filterLocations(value || '')),
    );
  }

  private filterComments(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.commentsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private filterLocations(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locationsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCommentsOptions(): void {
    this.apiMetaService.getDiscogsComments().subscribe((comments: string[]) => {
      this.commentsOptions = comments;
    });
  }

  getLocationsOptions(): void {
    this.apiMetaService.getDiscogsLocations().subscribe((locations: string[]) => {
      this.locationsOptions = locations;
    });
  }

  setFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      mediaCondition: new UntypedFormControl(null, Validators.required),
      sleeveCondition: new UntypedFormControl(null),
      comments: new UntypedFormControl(null),
      privateComments: new UntypedFormControl(null),
      location: new UntypedFormControl(null),
      metaTitle: new UntypedFormControl(this.release.metaTitle),
      metaDescription: new UntypedFormControl(this.release.metaDescription)
    });
    this.formGroup.valueChanges.subscribe(() => {
      this.values.emit(this.formGroup);
    });
    this.values.emit(this.formGroup);
  }

  onSelectMediaCondition(value: string): void {
    this.mediaCondition.emit(value);
  }
}
