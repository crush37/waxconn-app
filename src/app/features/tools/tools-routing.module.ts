import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'repricing-agent', pathMatch: 'full',
  },
  {
    path: 'repricing-agent',
    loadChildren: () => import('./repricing-agent/repricing-agent.module').then(m => m.RepricingAgentModule)
  },
  {
    path: 'listings-manager',
    loadChildren: () => import('./listings-manager/listings-manager.module').then(m => m.ListingsManagerModule)
  },
  {
    path: 'database-importer',
    loadChildren: () => import('./database-importer/database-importer.module').then(m => m.DatabaseImporterModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule {
}
