import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import * as data from '../../update-notes.json';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html'
})
export class UpdateNotificationComponent {
  updateAvailable = false;
  animate = true;
  animState = false;

  news: any = (data as any).default;

  constructor(appRef: ApplicationRef, private updates: SwUpdate) {
    if (updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable));
      const everyThreeHours$ = interval(3 * 60 * 60 * 1000);
      const everyThreeHoursOnceAppIsStable$ = concat(appIsStable$, everyThreeHours$);

      everyThreeHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
      updates.versionUpdates.subscribe(() => this.updateAvailable = true);
    }
  }

  getTooltipText(): string {
    let update = this.news.slice(-1)[0];

    return 'Update Available. What\'s new? \n\n ' + update.description + '\n\n Click to update Waxconn';
  }

  updateApp() {
    if (this.updates.isEnabled) {
      this.updates.activateUpdate().then(() => document.location.reload());
    }
  }

  stopAnimation(event: any) {
    if (event.type === 'show') {
      this.animate = false;
    }
  }

  animDone() {
    if (this.animate) {
      this.animState = !this.animState;
    }
  }
}
