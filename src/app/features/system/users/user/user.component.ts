import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formGroup!: FormGroup;

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
    this.formGroup = new FormGroup({
      id: new FormControl(this.id),
      role: new FormControl(this.user?.role, Validators.required),
      firstName: new FormControl(this.user?.firstName, Validators.required),
      lastName: new FormControl(this.user?.lastName, Validators.required),
      email: new FormControl(this.user?.email, Validators.required),
      phone: new FormControl(this.user?.phone),
      newOrderNotification: new FormControl(this.user?.newOrderNotification ?? false),
      paidOrderNotification: new FormControl(this.user?.paidOrderNotification ?? false),
    });
  }
}
