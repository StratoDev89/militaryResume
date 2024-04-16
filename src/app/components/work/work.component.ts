import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { WorkExperience, FormField } from '../../interfaces/interfaces';
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

  isEdition = signal(false);

  form = new FormGroup({
    position: new FormControl(),
    organization: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
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
