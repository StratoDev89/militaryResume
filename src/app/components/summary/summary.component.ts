import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Summary } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  summary = signal<Summary>(null);
  showSummary = signal(false);

  summaryForm = new FormGroup({
    summary: new FormControl(''),
  });

  saveSummary() {
    this.toggleSumary();

    if (this.summaryForm.get('summary')?.value!) {
      this.summary.set(this.summaryForm.get('summary')?.value!);

      localStorage.setItem('summary', this.summary()!);
    }
  }

  toggleSumary() {
    this.showSummary.update((prev) => !prev);
  }

  ngOnInit() {
    const savedSummary = localStorage.getItem('summary') as Summary;

    if (savedSummary) {
      this.summary.set(savedSummary);
      this.summaryForm.patchValue({ summary: savedSummary })
    }
  }
}