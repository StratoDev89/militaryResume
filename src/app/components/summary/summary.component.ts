import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Summary } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';
import { DividerComponent } from '../divider/divider.component';
import { SmallDividerComponent } from '../small-divider/small-divider.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BtnComponent,
    DividerComponent,
    SmallDividerComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  summary = signal<Summary>(null);
  showSummary = signal(false);
  storageVariable = 'summary';
  storageServ = inject(StorageService);

  summaryForm = new FormGroup({
    summary: new FormControl(''),
  });

  saveSummary() {
    this.toggleSumary();


    if (this.summaryForm.get('summary')?.value!) {
      this.summary.set(this.summaryForm.get('summary')?.value!);

      this.storageServ.setStorage(this.storageVariable, this.summary());
      return;
    }

    this.storageServ.remove(this.storageVariable);
    this.summary.set(null)
  }

  toggleSumary() {
    this.showSummary.update((prev) => !prev);
  }

  ngOnInit() {
    const savedSummary = localStorage.getItem('summary') as Summary;

    if (savedSummary) {
      this.summary.set(savedSummary);
      this.summaryForm.patchValue({ summary: savedSummary });
    }
  }
}
