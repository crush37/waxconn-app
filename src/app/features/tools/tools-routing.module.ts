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
    path: 'database-importer',
    loadChildren: () => import('./database-importer/database-importer.module').then(m => m.DatabaseImporterModule)
  },
  // {
  //   path: 'listings-publisher',
  //   loadChildren: () => import('./listings/listings.module').then(m => m.ListingsModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule {
}
