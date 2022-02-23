import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseImporterComponent } from './database-importer/database-importer.component';

const routes: Routes = [
  { path: '', component: DatabaseImporterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseImporterRoutingModule { }
