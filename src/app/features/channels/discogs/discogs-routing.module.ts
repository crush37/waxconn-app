import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseListComponent } from './release-list/release-list.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '', component: ReleaseListComponent
  },
  {
    path: ':id', component: CreateListingComponent
  },
  {
    path: 'settings/:id', component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscogsRoutingModule {
}
