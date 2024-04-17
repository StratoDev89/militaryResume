import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { WorkExperience } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StatesService } from '../../services/states.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [BtnComponent, ReactiveFormsModule, DatePipe],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  states = inject(StatesService).getStates();

  @Input({ required: true }) work!: WorkExperience;
  @Output() deleteClick = new EventEmitter<string>();
  @Output() updateClick = new EventEmitter<WorkExperience>();

  workUpdated = signal<WorkExperience | null>(null);

  isEdition = signal(true);

  form = new FormGroup({
    position: new FormControl(),
    organization: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null | string>(null, []),
    hours: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.form.patchValue(this.work);
  }

  editToggle() {
    this.isEdition.update((prev) => !prev);
  }

  updateWork() {
    this.editToggle();

    const experience = this.getAllFormFields();

    this.updateClick.emit(experience);
  }

  getAllFormFields() {
    const experience = {
      id: this.work.id,
      position: this.form.get('position')?.value!,
      organization: this.form.get('organization')?.value!,
      address: this.form.get('address')?.value!,
      city: this.form.get('city')?.value!,
      state: this.form.get('state')?.value!,
      zipCode: this.form.get('zipCode')?.value!,
      startDate: new Date(this.form.get('startDate')?.value!),
      endDate: this.form.get('endDate')?.value
        ? new Date(this.form.get('endDate')?.value!)
        : 'Current',
      hours: this.form.get('hours')?.value!,
      salary: this.form.get('salary')?.value!,
      skills: this.form.get('skills')?.value!,
    };

    return experience;
  }

  deleteWorkExperience(id: string) {
    this.deleteClick.emit(id);
  }

  // getters
  get position() {
    return this.form.get('position');
  }

  get organization() {
    return this.form.get('organization');
  }

  get address() {
    return this.form.get('address');
  }

  get city() {
    return this.form.get('city');
  }

  get state() {
    return this.form.get('state');
  }

  get zipCode() {
    return this.form.get('zipCode');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  get hours() {
    return this.form.get('hours');
  }

  get salary() {
    return this.form.get('salary');
  }

  get skills() {
    return this.form.get('skills');
  }
}
