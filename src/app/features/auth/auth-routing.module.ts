import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ActivateComponent } from './activate/activate.component';

const activationRoute = 'activate/:id/:hash/:signature';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'auth/' + activationRoute, redirectTo: activationRoute, pathMatch: 'full' },
  { path: activationRoute, component: ActivateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
