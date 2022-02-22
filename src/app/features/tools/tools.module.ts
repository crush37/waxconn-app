import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule {
}
