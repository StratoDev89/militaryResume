import { Component, inject, signal } from '@angular/core';
import { Award } from '../../interfaces/interfaces';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { UuidService } from '../../services/uuid.service';
import { DividerComponent } from '../divider/divider.component';
import { BtnComponent } from '../btn/btn.component';
import { SmallDividerComponent } from '../small-divider/small-divider.component';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DividerComponent,
    BtnComponent,
    SmallDividerComponent,
  ],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.scss',
})
export class AwardsComponent {
  uuidService = inject(UuidService);
  storageServ = inject(StorageService);

  awards = signal<Award | null>(null);
  showForm = signal(false);
  storageVariable = 'awards';

  form = new FormGroup({
    award: new FormControl<null | string>(null),
  });

  ngOnInit(): void {
    const savedAwards = this.storageServ.getStorage(this.storageVariable);

    if (savedAwards) {
      const awards = JSON.parse(savedAwards) as Award;
      this.awards.set(awards);
      this.form.patchValue(awards);
    }
  }

  toggleForm() {
    this.showForm.update((prev) => !prev);
  }

  addAward() {
    this.showForm.update((prev) => !prev);

    if (this.form.get('award')?.value!) {
      const award = {
        id: this.uuidService.uuidv4,
        award: this.form.get('award')?.value!,
      };

      this.awards.set(award);
      this.storageServ.setStorage(this.storageVariable, this.awards());

      return;
    }

    this.storageServ.remove(this.storageVariable);
    this.awards.set(null);
  }
}
