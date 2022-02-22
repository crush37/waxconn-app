import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-part-order-notes',
  templateUrl: './part-order-notes.component.html'
})
export class PartOrderNotesComponent {
  @Input() notes!: string | null;
}
