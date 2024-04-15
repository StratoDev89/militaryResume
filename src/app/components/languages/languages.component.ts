import { Component, inject, signal } from '@angular/core';
import { LanguageLevels, Languages } from '../../interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { UuidService } from '../../services/uuid.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BtnComponent } from '../btn/btn.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, DividerComponent],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);

  languages = signal<Languages[]>([]);
  levels: LanguageLevels[] = ['None', 'Novice', 'Intermediate', 'Advanced'];
  showForm = signal(false);
  showUpdateForm = signal(false);
  storageVariable = 'languages';

  form = new FormGroup({
    language: new FormControl('', [Validators.required]),
    spoken: new FormControl('', [Validators.required]),
    read: new FormControl('', [Validators.required]),
    written: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const savedLanguages = this.storageServ.getStorage(this.storageVariable);

    if (savedLanguages) {
      const languages = JSON.parse(savedLanguages) as Languages[];
      this.languages.set(languages);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  toggleUpdateForm() {
    this.showUpdateForm.update((prev) => !prev);
  }

  addLanguage() {
    this.toggleForm();

    if (this.form.valid) {
      const language: Languages = {
        id: this.uuidService.uuidv4,
        language: this.form.get('language')?.value!,
        spoken: this.form.get('spoken')?.value! as LanguageLevels,
        read: this.form.get('read')?.value! as LanguageLevels,
        written: this.form.get('written')?.value! as LanguageLevels,
      };

      this.languages.update((prev) => [...prev, language]);
      this.storageServ.setStorage(this.storageVariable, this.languages());

    }
  }

  deleteLanguage(id: string) {
    const newLanguages = this.languages().filter((item) => item.id !== id);
    this.languages.set(newLanguages);
    this.storageServ.setStorage(this.storageVariable, this.languages());
    this.toggleForm();
  }
}
