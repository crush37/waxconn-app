import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { ReleaseList, ReleaseListSerializer } from '../discogs.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { SearchConfig } from '@shared/data-list/data-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'discogs/releases' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: ReleaseListSerializer },
    DataListService,
    { provide: 'DataListServiceStorageKey', useValue: 'discogs' },
  ]
})
export class ReleaseListComponent implements OnInit {
  title = 'Search Discogs';
  subTitle = 'Discogs';
  searchConfig: SearchConfig = {
    label: 'Search',
    appearance: 'outline',
    showFilterInput: true,
    withAutoRefresh: false,
  };
  enabled = false;

  imagePlaceholder = './assets/default-placeholder.png';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      response.app.channels?.forEach((channel: any) => {
        if (channel.type === 'discogs') {
          this.enabled = channel.isActive;
        }
      });
    });
  }

  g = (row: ReleaseList) => row;
}
