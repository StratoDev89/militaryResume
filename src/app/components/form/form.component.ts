import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from '../summary/summary.component';

import { HeaderFormInfo } from '../../interfaces/interfaces';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { FieldContainerComponent } from '../field-container/field-container.component';
import { CertificationsComponent } from '../certifications/certifications.component';
import { AwardsComponent } from '../awards/awards.component';
import { AditionalInfoComponent } from '../aditional-info/aditional-info.component';
import { LanguagesComponent } from '../languages/languages.component';
import { DividerComponent } from '../divider/divider.component';
import { ReferencesComponent } from '../references/references.component';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import { DividerToRenderComponent } from '../divider-to-render/divider-to-render.component';
import { BtnComponent } from '../btn/btn.component';
import { StorageService } from '../../services/storage.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FieldContainerComponent,
    SummaryComponent,
    ExperienceComponent,
    EducationComponent,
    CertificationsComponent,
    AwardsComponent,
    AditionalInfoComponent,
    LanguagesComponent,
    DividerComponent,
    ReferencesComponent,
    DividerToRenderComponent,
    BtnComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input({ required: true }) headerFormInfo!: HeaderFormInfo;
  storageServ = inject(StorageService);
  pdfServ = inject(PdfService);

  generatePdf() {
    this.pdfServ.generatePdf();
  }
}
