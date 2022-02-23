import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    MainLayoutComponent,
    BasicLayoutComponent,
    BlankLayoutComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ]
})
export class LayoutsModule {
}
