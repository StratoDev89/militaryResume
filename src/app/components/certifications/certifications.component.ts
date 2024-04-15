import { Component, inject, signal } from '@angular/core';
import { Certification } from '../../interfaces/interfaces';
import { UuidService } from '../../services/uuid.service';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BtnComponent } from '../btn/btn.component';
import { DividerComponent } from '../divider/divider.component';
import { SmallDividerComponent } from '../small-divider/small-divider.component';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BtnComponent,
    DividerComponent,
    SmallDividerComponent,
  ],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);

  certifications = signal<Certification | null>(null);
  showForm = signal(false);
  storageVariable = 'certifications';

  form = new FormGroup({
    certification: new FormControl<null | string>(null),
  });

  ngOnInit(): void {
    const savedCertifications = this.storageServ.getStorage(
      this.storageVariable,
    );

    if (savedCertifications) {
      const certifications = JSON.parse(savedCertifications) as Certification;
      this.certifications.set(certifications);
      this.form.patchValue(certifications);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  addCertification() {
    this.showForm.update((prev) => !prev);

    if (this.form.get('certification')?.value!) {
      const certification = {
        id: this.uuidService.uuidv4,
        certification: this.form.get('certification')?.value!,
      };

      this.certifications.set(certification);
      this.storageServ.setStorage(this.storageVariable, this.certifications());

      return;
    }

    this.storageServ.remove(this.storageVariable);
    this.certifications.set(null);
  }
}
