import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button/back-button.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { DataListComponent } from '@shared/data-list/data-list.component';
import { DatePipe } from './pipes/date.pipe';
import { DeleteButtonComponent } from '@shared/delete-button/delete-button.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxComponent } from './lightbox/lightbox.component';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationsComponent } from './notifications/notifications.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveUnderscorePipe } from '@shared/pipes/remove-underscore.pipe';
import { RouterModule } from '@angular/router';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { UpdateNotificationComponent } from './update-notification/update-notification.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    ConfirmDialogComponent,
    CurrencyPipe,
    DataListComponent,
    DatePipe,
    DeleteButtonComponent,
    LightboxComponent,
    PageHeaderComponent,
    NotificationsComponent,
    RemoveUnderscorePipe,
    SubmitButtonComponent,
    UpdateNotificationComponent,
  ],
  imports: [
    CommonModule,
    GalleryModule,
    LightboxModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    BackButtonComponent,
    ConfirmDialogComponent,
    CurrencyPipe,
    DataListComponent,
    DatePipe,
    DeleteButtonComponent,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NotificationsComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    RemoveUnderscorePipe,
    RouterModule,
    SubmitButtonComponent,
    UpdateNotificationComponent,
    LightboxComponent,
  ]
})
export class SharedModule {
}
