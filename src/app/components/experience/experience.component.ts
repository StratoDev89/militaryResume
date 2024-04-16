import { Component, inject, signal } from '@angular/core';
import { WorkExperience } from '../../interfaces/interfaces';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UuidService } from '../../services/uuid.service';
import { BtnComponent } from '../btn/btn.component';
import { WorkComponent } from '../work/work.component';
import { StorageService } from '../../services/storage.service';
import { StatesService } from '../../services/states.service';
import { DividerComponent } from '../divider/divider.component';


@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, WorkComponent, DividerComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);
  states = inject(StatesService).getStates();
  showForm = signal(false);
  storageVariable = 'workExperience';
  workExperiences = signal<WorkExperience[]>([]);

  form = new FormGroup({
    position: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    hours: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const savedExperiences = this.storageServ.getStorage(this.storageVariable);

    if (savedExperiences) {
      const experiences = JSON.parse(savedExperiences) as WorkExperience[];
      this.workExperiences.set(experiences);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  addWorkExperience() {
    this.showForm.update((prev) => !prev);

    if (this.form.valid) {
      const experience = this.getAllFormFields();
      this.workExperiences.update((prev) => [...prev, experience]);
      this.storageServ.setStorage(this.storageVariable, this.workExperiences());
    }
  }

  deleteWorkExperience(id: string) {
    const newExperiences = this.workExperiences().filter(
      (item) => item.id !== id,
    );
    this.workExperiences.set(newExperiences);
    this.storageServ.setStorage(this.storageVariable, this.workExperiences());
  }

  updateWorkExperience(work: WorkExperience) {
    const index = this.workExperiences().findIndex(
      (item) => item.id === work.id,
    );

    this.workExperiences()[index] = work;
    this.storageServ.setStorage(this.storageVariable, this.workExperiences());
  }

  getAllFormFields() {
    const experience = {
      id: this.uuidService.uuidv4,
      position: this.form.get('position')?.value!,
      organization: this.form.get('organization')?.value!,
      address: this.form.get('address')?.value!,
      city: this.form.get('city')?.value!,
      state: this.form.get('state')?.value!,
      zipCode: this.form.get('zipCode')?.value!,
      startDate: new Date(this.form.get('startDate')?.value!),
      endDate: new Date(this.form.get('endDate')?.value!),
      hours: this.form.get('hours')?.value!,
      salary: this.form.get('salary')?.value!,
      skills: this.form.get('skills')?.value!,
    };

    return experience;
  }
}
