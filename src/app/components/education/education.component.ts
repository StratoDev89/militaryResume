import { Component, inject, signal } from '@angular/core';
import { Education, LevelAttained } from '../../interfaces/interfaces';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { UuidService } from '../../services/uuid.service';
import { BtnComponent } from '../btn/btn.component';
import { DividerComponent } from '../divider/divider.component';


@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, DividerComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);
  showForm = signal(false);
  showUpdateForm = signal(false);
  educations = signal<Education[]>([]);
  storageVariable = 'education';
  levels: LevelAttained[] = [
    'High School Diploma',
    'Some College (No Degree)',
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    'Doctoral Degree',
    'Professional Degree (e.g., MD, JD, DDS)',
  ];

  form = new FormGroup({
    degree: new FormControl('', [Validators.required]),
    acronym: new FormControl('', [Validators.required]),
    yearGraduated: new FormControl('', [Validators.required]),
    levelAttained: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const savedEducations = this.storageServ.getStorage(this.storageVariable);

    if (savedEducations) {
      const educations = JSON.parse(savedEducations) as Education[];
      this.educations.set(educations);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  toggleUpdateForm() {
    this.showUpdateForm.update((prev) => !prev);
  }

  addEducation() {
    this.toggleForm();

    if (this.form.valid) {
      const education: Education = {
        id: this.uuidService.uuidv4,
        degree: this.form.get('degree')?.value!,
        acronym: this.form.get('acronym')?.value!,
        yearGraduated: this.form.get('yearGraduated')?.value!,
        levelAttained: this.form.get('levelAttained')?.value! as LevelAttained,
      };

      this.educations.update((prev) => [...prev, education]);
      this.storageServ.setStorage(this.storageVariable, this.educations());
    }
  }

  deleteEducation(id: string) {
    const newEducations = this.educations().filter((item) => item.id !== id);
    this.educations.set(newEducations);
    this.storageServ.setStorage(this.storageVariable, this.educations());
    this.toggleForm();
  }

  updateEducation(education: Education) {
    // TODO
  }
}
