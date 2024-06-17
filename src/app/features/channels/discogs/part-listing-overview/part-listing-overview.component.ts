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

  filteredCommentsOptions!: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiMetaService: ApiMetaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.appName = response.app.name;
    });

    this.getCommentsOptions();
    this.setFromGroup();

    this.filteredCommentsOptions = this.formGroup.controls.comments.valueChanges.pipe(
      map(value => this.filterComments(value || '')),
    );
  }

  private filterComments(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.commentsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCommentsOptions(): void {
    this.apiMetaService.getDiscogsComments().subscribe((comments: string[]) => {
      this.commentsOptions = comments;
    });
  }

  setFromGroup(): void {
    this.formGroup = new UntypedFormGroup({
      mediaCondition: new UntypedFormControl(null, Validators.required),
      sleeveCondition: new UntypedFormControl(null),
      comments: new UntypedFormControl(null),
      privateComments: new UntypedFormControl(null),
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
