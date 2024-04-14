import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from '../summary/summary.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HeaderFormInfo } from '../../interfaces/interfaces';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, SummaryComponent, ExperienceComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input({ required: true }) headerFormInfo!: HeaderFormInfo;

  generatePdf() {
    console.log('generate pdf');

    const elementToPrint = document.querySelector('#resume') as HTMLElement;
    console.log(elementToPrint);

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      const imgWidth = 210
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf")
    });
  }
}
