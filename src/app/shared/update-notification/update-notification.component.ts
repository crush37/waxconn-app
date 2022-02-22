import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import { heartBeatAnimation } from 'angular-animations';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  animations: [heartBeatAnimation({ duration: 1000, delay: 5000 })]
})
export class UpdateNotificationComponent {
  updateAvailable = false;
  animate = true;
  animState = false;

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
    return 'Update Available. \n Click to update Waxconn'
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
