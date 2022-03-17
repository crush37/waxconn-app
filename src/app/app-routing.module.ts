import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolver } from '@core/app.resolver';
import { AuthGuard } from '@features/auth/auth.guard';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { BasicLayoutComponent } from '@layouts/basic-layout/basic-layout.component';
import { BlankLayoutComponent } from '@layouts/blank-layout/blank-layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { app: AppResolver },
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'system',
        loadChildren: () => import('@features/system/system.module').then(m => m.SystemModule)
      },
      {
        path: 'tools',
        loadChildren: () => import('@features/tools/tools.module').then(m => m.ToolsModule)
      },
      {
        path: 'channels',
        loadChildren: () => import('@features/channels/channels.module').then(m => m.ChannelsModule)
      }
    ]
  },
  {
    path: '',
    component: BasicLayoutComponent,
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'maintenance-mode',
    component: BlankLayoutComponent,
    loadChildren: () => import('./features/maintenance-mode/maintenance-mode.module').then(m => m.MaintenanceModeModule)
  },
  {
    path: 'suspended',
    component: BlankLayoutComponent,
    loadChildren: () => import('./features/suspended/suspended.module').then(m => m.SuspendedModule)
  },
  {
    path: '**',
    component: BlankLayoutComponent,
    loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
