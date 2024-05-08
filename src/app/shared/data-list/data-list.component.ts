import { AfterViewInit, Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '@core/services/api.service';
import { Page } from '@core/models/page.model';
import { DataListService } from '@shared/data-list/data-list.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface SearchConfig {
  label?: string;
  appearance: 'standard' | 'outline' | 'fill';
  showFilterInput: boolean;
  selects?: {
    name: string,
    header: string,
    default: string | [],
    multiple: boolean,
    options: { text: string, value: number | string | boolean | null }[]
  }[];
}

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html'
})
export class DataListComponent implements OnInit, AfterViewInit {
  loading = false;
  importing = false;
  formGroup!: UntypedFormGroup;

  @Input() page!: any;
  @Input() viewMode = 'list';
  @Input() searchConfig?: SearchConfig;
  @Input() itemRoute?: string[];
  @Input() paginated = true;
  @Input() pageSizeOptions = [15, 30, 50, 100];
  @Input() selecting = false;

  @ContentChild('topActions', { static: false }) topActionsTemplateOutlet!: TemplateRef<any>;
  @ContentChild('beforeSearchActions', { static: false }) beforeSearchActionsOutlet!: TemplateRef<any>;
  @ContentChild('afterSearchActions', { static: false }) afterSearchActionsOutlet!: TemplateRef<any>;
  @ContentChild('header', { static: false }) headerTemplateOutlet!: TemplateRef<any>;
  @ContentChild('row', { static: false }) rowTemplateOutlet!: TemplateRef<any>;
  @ContentChild('footer', { static: false }) footerTemplateOutlet!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ids!: string[];
  query = this.dataListService.getStored('q') ?? '';
  visitedRows: any = this.dataListService.getStored('visited') ?? [];

  constructor(
    private apiService: ApiService<any>,
    private dataListService: DataListService) {
  }

  ngOnInit(): void {
    if (this.searchConfig) {
      this.setFormGroup();
    }
    if (!this.page) {
      this.dataListService.startWith({}).subscribe((params: {}) => {
        this.loadData(params);
      });
    }
  }

  ngAfterViewInit(): void {
    this.formGroup?.valueChanges.pipe(
      debounceTime(500), distinctUntilChanged()
    ).subscribe(next => this.dataListService.announce(next, true));

    this.paginator?.page.subscribe(next => {
      const stored: {} = this.dataListService.getStored();
      const params = {
        ...stored, ...{
          page: next.pageIndex,
          per_page: next.pageSize
        }
      };
      this.dataListService.storeValues(params);
      this.loadData(params);
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      q: new UntypedFormControl(this.query)
    });
    if (this.searchConfig?.selects) {
      this.searchConfig.selects.forEach(select => {
        this.formGroup.addControl(
          select.name, new UntypedFormControl(this.dataListService.getStored(select.name) ?? select.default)
        );
      });
    }
  }

  loadData(params: {}): void {
    this.loading = true;
    this.apiService.index(params).subscribe({
      next: (page: Page) => {
        this.ids = page.data.map(item => item.id);
        this.page = page;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 423) {
          this.importing = true;
          this.loading = false;
        }
      }
    });
  }

  makeRouterLink(row: any): string[] | undefined {
    if (this.itemRoute === undefined) {
      return;
    }
    const itemRoute = this.itemRoute.map(value => {
      if (value.includes(':')) {
        return row[value.slice(1)];
      }
      return value;
    });
    return ['/'].concat(itemRoute, [row.id]);
  }

  wasVisited(id: string): boolean {
    return this.query && this.visitedRows.includes(id);
  }

  getStatusFilterValue(): string | null {
    let status = null;
    if (this.searchConfig?.selects) {
      this.searchConfig.selects.forEach(select => {
        if (select.name === 'status') {
          status = this.dataListService.getStored(select.name) ?? select.default;
        }
      });
    }

    return status;
  }
}
