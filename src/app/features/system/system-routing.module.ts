import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { SettingsComponent } from './settings/settings.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'general', pathMatch: 'full',
  },
  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: 'general', component: GeneralComponent
  },
  {
    path: 'billing', component: BillingComponent
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule)
  },
  {
    path: 'channels',
    loadChildren: () => import('./channels/channels.module').then(m => m.ChannelsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
