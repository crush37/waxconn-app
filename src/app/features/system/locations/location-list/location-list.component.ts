import { Component } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Location, LocationSerializer } from '@core/models/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'locations' },
    { provide: 'apiServiceOptions', useValue: { sort_by: 'default' } },
    { provide: 'apiServiceSerializer', useClass: LocationSerializer }
  ]
})
export class LocationListComponent {
  title = 'Locations';
  subTitle = 'Settings';

  val = (row: Location) => row;
}
