import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '@core/services/api.service';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html'
})
export class CancelButtonComponent {
  @Input() label = 'Cancel';
  @Input() message = 'Cancelled successfully!';
  @Input() id!: string;

  constructor(
    private location: Location,
    private snackbar: MatSnackBar,
    private apiService: ApiService<any>,
    private dialog: MatDialog) {
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        title: 'Are you sure?',
        message: 'This operation cannot be undone.'
      },
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.submit();
      }
    });
  }

  submit(): void {
    if (!this.id) {
      return;
    }

    const item = {
      id: this.id, cancelledAt: null, cancelReason: 'by user'
    }

    this.apiService.update(item).subscribe(() => {
      this.snackbar.open(this.message, 'close');
      setTimeout(() => {
        this.location.back();
      }, 500);
    });
  }
}
