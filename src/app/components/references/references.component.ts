import { Component, inject, signal } from '@angular/core';
import { Reference } from '../../interfaces/interfaces';
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
  selector: 'app-references',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, DividerComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);
  showForm = signal(false);
  showUpdateForm = signal(false);
  references = signal<Reference[]>([]);
  referenceToEdit = signal<Reference | null>(null);
  storageVariable = 'references';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    employer: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const savedReferences = this.storageServ.getStorage(this.storageVariable);

    if (savedReferences) {
      const references = JSON.parse(savedReferences) as Reference[];
      this.references.set(references);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  toggleUpdateForm() {
    this.showUpdateForm.update((prev) => !prev);
  }

  addReference() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const reference = this.getAllFormFields();
    this.references.update((prev) => [...prev, reference]);
    this.storageServ.setStorage(this.storageVariable, this.references());
    this.toggleForm();
    this.form.reset();
  }

  deleteReference(id: string) {
    const newReferences = this.references().filter((item) => item.id !== id);
    this.references.set(newReferences);
    this.storageServ.setStorage(this.storageVariable, this.references());
    this.toggleForm();
  }

  getAllFormFields() {
    const reference: Reference = {
      id: this.uuidService.uuidv4,
      name: this.form.get('name')?.value!,
      employer: this.form.get('employer')?.value!,
      title: this.form.get('title')?.value!,
      phone: this.form.get('phone')?.value!,
      email: this.form.get('email')?.value!,
    };

    return reference;
  }

  setNull() {
    this.referenceToEdit.set(null);
  }

  setEditrReference(reference: Reference) {
    this.referenceToEdit.set(reference);
    this.form.patchValue(reference);
  }

  updateReference() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const index = this.references().findIndex(
      (edu) => edu.id === this.referenceToEdit()?.id,
    );

    const reference = this.getAllFormFields();
    this.references()[index] = reference;
    this.storageServ.setStorage(this.storageVariable, this.references());
    this.setNull();
    this.toggleForm();
    this.form.reset();
  }

  // getters
  get name() {
    return this.form.get('name');
  }

  get employer() {
    return this.form.get('employer');
  }

  get title() {
    return this.form.get('title');
  }

  get phone() {
    return this.form.get('phone');
  }

  get email() {
    return this.form.get('email');
  }
}
