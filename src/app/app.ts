import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SelectDialog } from './select-dialog/select-dialog';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-21');
  protected readonly selectedCity = signal<string | null>(null);

  private readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedCity.set(result.name);
      }
    });
  }
}
