import { Component } from '@angular/core';
import { User, UserSerializer } from '@core/models/user.model';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'users' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: UserSerializer }
  ]
})
export class UserListComponent {
  title = 'Users';
  subTitle = 'System';

  val = (row: User) => row;
}
