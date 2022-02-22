import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DatabaseImporterRoutingModule } from './database-importer-routing.module';
import { DatabaseImporterComponent } from './database-importer/database-importer.component';

@NgModule({
  declarations: [DatabaseImporterComponent],
  imports: [
    SharedModule,
    DatabaseImporterRoutingModule
  ]
})
export class DatabaseImporterModule {
}
