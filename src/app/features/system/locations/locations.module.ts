import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationComponent } from './location/location.component';
import { LocationListComponent } from './location-list/location-list.component';

@NgModule({
  declarations: [LocationComponent, LocationListComponent],
  imports: [
    SharedModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
