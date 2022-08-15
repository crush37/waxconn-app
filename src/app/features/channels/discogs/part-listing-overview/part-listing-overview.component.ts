import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Release } from '@features/channels/discogs/discogs.model';

@Component({
  selector: 'app-part-listing-overview',
  templateUrl: './part-listing-overview.component.html'
})
export class PartListingOverviewComponent implements OnInit {
  @Input() release!: Release;
  @Output() values = new EventEmitter<FormGroup>();
  @Output() mediaCondition = new EventEmitter<string>();

  formGroup!: FormGroup;
  appName!: string;

  imagePlaceholder: { type: string, src: string, thumb: string, width: string, height: string }[] = [{
    type: '',
    src: './assets/default-placeholder.png',
    thumb: './assets/default-placeholder.png',
    width: '1500',
    height: '1500',
  }];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.appName = response.app.name;
    });
    this.formGroup = new FormGroup({
      mediaCondition: new FormControl(null, Validators.required),
      sleeveCondition: new FormControl(null),
      comments: new FormControl(null),
      privateComments: new FormControl(null),
      location: new FormControl(null),
      metaTitle: new FormControl(this.release.metaTitle),
      metaDescription: new FormControl(this.release.metaDescription)
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
