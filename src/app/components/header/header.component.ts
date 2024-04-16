import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { HeaderFormInfo } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormComponent, BtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerFormInfo: HeaderFormInfo | null = null;
  states = inject(StatesService).getStates();

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  addHeader() {
    if (this.form.valid) {
      this.headerFormInfo = {
        firstName: this.form.get('firstName')?.value!,
        lastName: this.form.get('lastName')?.value!,
        street: this.form.get('street')?.value!,
        city: this.form.get('city')?.value!,
        state: this.form.get('state')?.value!,
        zipCode: this.form.get('zipCode')?.value!,
        email: this.form.get('email')?.value!,
        phone: this.form.get('phone')?.value!,
      };

      localStorage.setItem('header', JSON.stringify(this.headerFormInfo));
      return;
    }

    this.form.markAllAsTouched();
  }

  ngOnInit() {
    const header = localStorage.getItem('header');

    if (header) {
      this.headerFormInfo = JSON.parse(header);
      this.form.patchValue(this.headerFormInfo!);
    }
  }

  // getters
  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get street() {
    return this.form.get('street');
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

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }
}
