import { Component, inject, signal } from '@angular/core';
import { AdditionalInfo } from '../../interfaces/interfaces';
import { UuidService } from '../../services/uuid.service';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DividerComponent } from '../divider/divider.component';
import { BtnComponent } from '../btn/btn.component';
import { SmallDividerComponent } from '../small-divider/small-divider.component';

@Component({
  selector: 'app-aditional-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DividerComponent,
    BtnComponent,
    SmallDividerComponent,
  ],
  templateUrl: './aditional-info.component.html',
  styleUrl: './aditional-info.component.scss',
})
export class AditionalInfoComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);

  additionalInfo = signal<AdditionalInfo | null>(null);
  showForm = signal(false);
  storageVariable = 'additionalInformation';

  form = new FormGroup({
    additionalInfo: new FormControl<null | string>(null),
  });

  ngOnInit(): void {
    const savedAdditionalInfo = this.storageServ.getStorage(
      this.storageVariable,
    );

    if (savedAdditionalInfo) {
      const additionalInfo = JSON.parse(savedAdditionalInfo) as AdditionalInfo;
      this.additionalInfo.set(additionalInfo);
      this.form.patchValue(additionalInfo);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  addInfo() {
    this.showForm.update((prev) => !prev);

    if (this.form.get('additionalInfo')?.value!) {
      const additionalInfo = {
        id: this.uuidService.uuidv4,
        additionalInfo: this.form.get('additionalInfo')?.value!,
      };

      this.additionalInfo.set(additionalInfo);
      this.storageServ.setStorage(this.storageVariable, this.additionalInfo());

      return;
    }

    this.storageServ.remove(this.storageVariable);
    this.additionalInfo.set(null);
  }
}
