import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import * as data from '../../update-notes.json';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html'
})
export class UpdateNotificationComponent {
  updateAvailable = true;
  animate = true;

  constructor(public dialog: MatDialog, appRef: ApplicationRef, private updates: SwUpdate) {
    if (updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable));
      const everyThreeHours$ = interval(3 * 60 * 60 * 1000);
      const everyThreeHoursOnceAppIsStable$ = concat(appIsStable$, everyThreeHours$);

      everyThreeHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
      updates.versionUpdates.subscribe(() => this.updateAvailable = true);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateNotificationDialogComponent, {
      width: '550px',
      disableClose: false,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}

@Component({
  selector: 'app-update-notification-dialog',
  templateUrl: './update-notification-dialog.component.html'
})
export class UpdateNotificationDialogComponent {
  news: any = (data as any).default;
  updateDate: string;
  updateDescription: string;

  constructor() {
    this.updateDate = this.news.slice(-1)[0].date;
    this.updateDescription = this.news.slice(-1)[0].description;
  }
}
