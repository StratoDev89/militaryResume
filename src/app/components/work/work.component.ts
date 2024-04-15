import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { WorkExperience, FormField } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [BtnComponent, ReactiveFormsModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  states = inject(StatesService).getStates();

  @Input({ required: true }) work!: WorkExperience;
  @Output() deleteClick = new EventEmitter<string>();
  @Output() updateClick = new EventEmitter<WorkExperience>();

  workUpdated = signal<WorkExperience | null>(null);
  isEdition = signal(false);

  form = new FormGroup({
    position: new FormControl(),
    organization: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipCode: new FormControl(''),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    hours: new FormControl(''),
    salary: new FormControl(''),
    skills: new FormControl(''),
  });

  ngOnInit(): void {
    this.form.patchValue(this.work);
  }

  editToggle() {
    this.isEdition.update((prev) => !prev);
  }

  updateWork() {
    this.editToggle();

    const workUpdated: WorkExperience = {
      id: this.work.id,
      position: '',
      organization: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      startDate: this.work.startDate,
      endDate: this.work.endDate,
      hours: '',
      salary: '',
      skills: '',
    };

    Object.keys(this.form.controls).forEach((control) => {
      workUpdated[control as keyof WorkExperience] =
        this.form.get(control)?.value;
    });

    this.updateClick.emit(workUpdated);
  }

  deleteWorkExperience(id: string) {
    this.deleteClick.emit(id);
  }
}
