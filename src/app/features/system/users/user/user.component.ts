import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { User, UserSerializer } from '@core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'users' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: UserSerializer }
  ]
})
export class UserComponent implements OnInit {
  loading = false;

  title = 'User';
  subTitle = 'System';

  id!: string;
  user?: User;
  formGroup!: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService<User>) {
    this.setFormGroup();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id') || this.id) {
        this.id = params.get('id') || this.id;
        this.loading = true;
        this.apiService.get(this.id).subscribe((user: User) => {
          this.user = user;
          this.setFormGroup();
          this.loading = false;
        });
      }
    });
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(this.id),
      role: new UntypedFormControl(this.user?.role, Validators.required),
      firstName: new UntypedFormControl(this.user?.firstName, Validators.required),
      lastName: new UntypedFormControl(this.user?.lastName, Validators.required),
      email: new UntypedFormControl(this.user?.email, Validators.required),
      phone: new UntypedFormControl(this.user?.phone),
      newOrderNotification: new UntypedFormControl(this.user?.newOrderNotification ?? false),
      paidOrderNotification: new UntypedFormControl(this.user?.paidOrderNotification ?? false),
    });
  }
}
