import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  declarations: [LoginComponent, ActivateComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
