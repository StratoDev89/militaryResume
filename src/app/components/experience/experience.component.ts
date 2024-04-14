import { Component, inject, signal } from '@angular/core';
import { workExperience } from '../../interfaces/interfaces';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UuidService } from '../../services/uuid.service';
import { BtnComponent } from '../btn/btn.component';
import { WorkComponent } from '../work/work.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, WorkComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  uuidService = inject(UuidService);
  showForm = signal(false);
  isEdition = signal(false);

  workExperiences = signal<workExperience[]>([]);

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
    const savedExperiences = localStorage.getItem('workExperience');

    if (savedExperiences) {
      const experiences = JSON.parse(savedExperiences) as workExperience[];
      this.workExperiences.set(experiences);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  addWorkExperience() {
    this.showForm.update((prev) => !prev);

    if (this.form.invalid) {
      console.log('invalid');
    }

    if (this.form.valid) {
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

      this.workExperiences.update((prev) => [...prev, experience]);

      localStorage.setItem(
        'workExperience',
        JSON.stringify(this.workExperiences()),
      );
    }
  }

  deleteWorkExperience(id: string) {
    const newExperiences = this.workExperiences().filter(
      (item) => item.id !== id,
    );
    this.workExperiences.set(newExperiences);

    localStorage.setItem('workExperience', JSON.stringify(newExperiences));
  }

  updateWorkExperience(work: workExperience) {
    const index = this.workExperiences().findIndex(
      (item) => item.id === work.id,
    );
    this.workExperiences()[index] = work;

    localStorage.setItem(
      'workExperience',
      JSON.stringify(this.workExperiences()),
    );
  }

  editToggle() {
    this.isEdition.update((prev) => !prev);
  }
}
