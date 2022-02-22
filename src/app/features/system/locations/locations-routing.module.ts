import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  { path: '', component: LocationListComponent },
  { path: 'new', component: LocationComponent },
  { path: ':id', component: LocationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {
}
