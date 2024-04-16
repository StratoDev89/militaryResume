import { Component, Input, inject } from '@angular/core';
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
import { StorageService } from '../../services/storage.service';

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

  async generatePdf() {
    try {
      const pdf = new jsPDF({});
      const toCanvas1 = document.querySelector('#toCanvas1') as HTMLElement;
      const toCanvas2 = document.querySelector('#toCanvas2') as HTMLElement;
      const toCanvas3 = document.querySelector('#toCanvas3') as HTMLElement;

      // const toInsert = document.querySelector('#toInsert') as HTMLElement;
      // elementsArray.forEach((elem) => console.log({ height: elem.clientHeight }));

      // const maxHeight = 1400;
      // const maxHeight = 2100;
      const maxHeight = (window.innerHeight / 607) * 2100;

      let count = 0;
      let firstPageComplete = false;
      let secondPageComplete = false;
      let threePageComplete = false;
      let paddingToSecondPage = false;
      let paddingToThirdtPage = false;

      const elements = document.querySelectorAll(
        '#resume',
      ) as NodeListOf<HTMLElement>;

      elements.forEach((resumeElement) => {
        const elementsToRemove = resumeElement.querySelectorAll('#remove');

        elementsToRemove.forEach((removeElement) => {
          removeElement.remove();
        });
      });

      const elementsArray = Array.from(elements);

      elementsArray.forEach((elem) => {
        if (elem.clientHeight > 0) {
          elem.style.padding = '.5rem 3rem';
        }
      });

      elementsArray[0].style.paddingTop = '4rem';

      // elementsArray.forEach((elem) =>
      //   console.log({ despues: elem.clientHeight }),
      // );

      elementsArray.forEach((elem, i) => {
        const elemnHeight = elem.clientHeight;

        count += elemnHeight;

        if (count > maxHeight) {
          firstPageComplete = true;
        }

        if (count > maxHeight * 1.5) {
          secondPageComplete = true;
        }

        if (count < maxHeight && !firstPageComplete) {
          toCanvas1.appendChild(elem.cloneNode(true));
        }

        if (count < maxHeight * 1.5 && firstPageComplete) {
          if (!paddingToSecondPage) {
            elementsArray[i].style.paddingTop = '4rem';
          }

          toCanvas2.appendChild(elem.cloneNode(true));
          paddingToSecondPage = true;
        }

        if (secondPageComplete) {
          if (!paddingToThirdtPage) {
            elementsArray[i].style.paddingTop = '4rem';
          }

          toCanvas3.appendChild(elem.cloneNode(true));
          paddingToThirdtPage = true;
        }
      });

      const canvas1 = await html2canvas(toCanvas1, {
        scale: 2,
      });
      const imgHeight1 = (canvas1.height * 210) / canvas1.width;

      const canvas2 = await html2canvas(toCanvas2, {
        scale: 2,
      });

      const imgHeight2 = (canvas2.height * 210) / canvas2.width;

      const canvas3 = await html2canvas(toCanvas3, {
        scale: 2,
      });

      const imgHeight3 = (canvas3.height * 210) / canvas3.width;

      pdf.addImage(
        canvas1.toDataURL('image/png'),
        'PNG',
        0,
        0,
        210,
        imgHeight1,
      );

      if (firstPageComplete) {
        pdf.addPage();
        pdf.addImage(
          canvas2.toDataURL('image/png'),
          'PNG',
          0,
          0,
          210,
          imgHeight2,
        );
      }

      if (secondPageComplete) {
        pdf.addPage();

        pdf.addImage(
          canvas3.toDataURL('image/png'),
          'PNG',
          0,
          0,
          210,
          imgHeight3,
        );
      }

      pdf.save('resume.pdf');
    } catch (error) {
      alert('try to summarize your content');
    }
  }
}
