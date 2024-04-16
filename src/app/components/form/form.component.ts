import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from '../summary/summary.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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

  generatePdf() {
    const elementToPrint = document.querySelector('#resume') as HTMLElement;
    const toInsert = document.querySelector('#toInsert') as HTMLElement;
    const elementsToRemove = elementToPrint.querySelectorAll('#remove');

    elementsToRemove.forEach((element) => {
      element.parentNode?.removeChild(element);
    });

    html2canvas(elementToPrint, {
      scale: 2,
      height: elementToPrint.clientHeight,
    }).then((canvas) => {
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      toInsert.appendChild(canvas);

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight,
      );
      pdf.save('resume.pdf');
    });
  }
}
