import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

interface City {
  id: number;
  name: string;
}

@Component({
  selector: 'app-select-dialog',
  imports: [MatDialogModule, MatButtonModule, NgSelectModule, FormsModule],
  templateUrl: './select-dialog.html',
  styleUrl: './select-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDialog {
  protected readonly cities: City[] = [
    { id: 1, name: 'Helsinki' },
    { id: 2, name: 'Tampere' },
    { id: 3, name: 'Turku' },
    { id: 4, name: 'Oulu' },
    { id: 5, name: 'Espoo' },
    { id: 6, name: 'Vantaa' },
    { id: 7, name: 'Jyväskylä' },
    { id: 8, name: 'Kuopio' },
    { id: 9, name: 'Lahti' },
    { id: 10, name: 'Rovaniemi' }
  ];

  protected readonly selectedCity = signal<City | null>(null);

  constructor(private readonly dialogRef: MatDialogRef<SelectDialog>) {}

  close(): void {
    this.dialogRef.close(this.selectedCity());
  }
}
