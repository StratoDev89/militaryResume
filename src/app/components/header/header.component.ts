import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { HeaderFormInfo } from '../../interfaces/interfaces';
import { BtnComponent } from '../btn/btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormComponent, BtnComponent, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerFormInfo: HeaderFormInfo | null = null;

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
    }
  }

  ngOnInit() {
    const header = localStorage.getItem('header');

    if (header) {
      this.headerFormInfo = JSON.parse(header);
      this.form.patchValue(this.headerFormInfo!);
    }
  }

  // baseFormContent : BaseForm = {
  //   firstName:'daniel',
  //   lastName:'pacheco',
  //   street: 'calle gritaldot',
  //   city:'El tigre',
  //   state: 'anzoategui',
  //   zipCode: '123123',
  //   email: 'daniel@gmail.com',
  //   phone: '123123123',
  // }
}
