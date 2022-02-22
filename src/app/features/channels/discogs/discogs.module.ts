import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DiscogsRoutingModule } from './discogs-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ReleaseListComponent } from './release-list/release-list.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { PartListingOverviewComponent } from './part-listing-overview/part-listing-overview.component';
import { PartListingSummaryComponent } from './part-listing-summary/part-listing-summary.component';
import { ListingCreatedDialogComponent } from './listing-created-dialog/listing-created-dialog.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ReleaseListComponent,
    CreateListingComponent,
    PartListingOverviewComponent,
    PartListingSummaryComponent,
    ListingCreatedDialogComponent
  ],
  imports: [
    SharedModule,
    DiscogsRoutingModule,
  ]
})
export class DiscogsModule {
}
