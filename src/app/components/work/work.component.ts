import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { workExperience, FormField } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [BtnComponent, ReactiveFormsModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  @Input({ required: true }) work!: workExperience;
  @Output() deleteClick = new EventEmitter<string>();
  @Output() updateClick = new EventEmitter<workExperience>();

  workUpdated = signal<workExperience | null>(null);

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

  isEdition = signal(false);

  editToggle() {
    this.isEdition.update((prev) => !prev);
  }

  updateWork() {
    this.editToggle();

    const workUpdated: workExperience = {
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
      workUpdated[control as keyof workExperience] =
        this.form.get(control)?.value;

        // this.work[control as keyof workExperience] = ''
    });

    this.updateClick.emit(workUpdated);
  }

  deleteWorkExperience(id: string) {
    this.deleteClick.emit(id);
  }

  ngOnInit(): void {
    this.form.patchValue(this.work);
  }
}
