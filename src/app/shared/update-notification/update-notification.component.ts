import {ApplicationRef, Component, OnInit} from '@angular/core';
import {SwUpdate, VersionEvent} from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import * as data from '../../changelog.json';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html'
})
export class UpdateNotificationComponent implements OnInit {
  updateAvailable = false;

  constructor(public dialog: MatDialog, public appRef: ApplicationRef, private swUpdate: SwUpdate) {
  }

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable));
      const everyMinutesOnceAppIsStable$ = concat(appIsStable$, interval(60 * 10 * 1000));

      everyMinutesOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());
      this.swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
        if (event.type === 'VERSION_READY') {
          this.updateAvailable = true;
        }
      });
    }

    if (localStorage.getItem('changelogDialog')) {
      this.openDialog();
    }
  }

  getTooltipText(): string {
    return 'Update Available. \n Click to update Waxconn'
  }

  updateApp() {
    if (this.swUpdate.isEnabled) {
      localStorage.setItem('changelogDialog', 'show');
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateNotificationDialogComponent, {
      width: '550px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.swUpdate.isEnabled) {
        localStorage.removeItem('changelogDialog');
      }
    });
  }
}

@Component({
  selector: 'app-update-notification-dialog',
  templateUrl: './update-notification-dialog.component.html'
})
export class UpdateNotificationDialogComponent {
  data: any = (data as any).default;
  update: { version: string, changelog: { added: string[], changed: string[], fixed: string[]} };

  constructor() {
    this.update = this.data.slice(-1)[0];
  }
}
