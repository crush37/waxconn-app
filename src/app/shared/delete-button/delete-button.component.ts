import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '@core/services/api.service';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html'
})
export class DeleteButtonComponent {
  @Input() label = 'Delete';
  @Input() message = 'Deleted successfully!';
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
    this.apiService.delete(this.id).subscribe(() => {
      this.snackbar.open(this.message, 'close');
      setTimeout(() => {
        this.location.back();
      }, 500);
    });
  }
}
