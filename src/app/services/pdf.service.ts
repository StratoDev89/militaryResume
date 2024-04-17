import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  async generatePdf() {
    try {
      const pdf = new jsPDF({});
      const elements = document.querySelectorAll(
        '#resume',
      ) as NodeListOf<HTMLElement>;

      const maxHeight = (window.innerHeight / 607) * 2100;
      const scale = 2;
      const toCanvas1 = document.querySelector('#toCanvas1') as HTMLElement;
      const toCanvas2 = document.querySelector('#toCanvas2') as HTMLElement;
      const toCanvas3 = document.querySelector('#toCanvas3') as HTMLElement;
      let firstPageComplete = false;
      let secondPageComplete = false;
      let threePageComplete = false;
      let paddingToSecondPage = false;
      let paddingToThirdtPage = false;
      let count = 0;

      const cleanElements = this.cleanUpElements(elements);

      cleanElements.forEach((elem, i) => {
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
            cleanElements[i].style.paddingTop = '4rem';
          }

          toCanvas2.appendChild(elem.cloneNode(true));
          paddingToSecondPage = true;
        }

        if (secondPageComplete) {
          if (!paddingToThirdtPage) {
            cleanElements[i].style.paddingTop = '4rem';
          }

          toCanvas3.appendChild(elem.cloneNode(true));
          paddingToThirdtPage = true;
        }
      });

      const [canvas1, canvas2, canvas3] = await Promise.all([
        this.generateCanvas(toCanvas1, scale),
        this.generateCanvas(toCanvas2, scale),
        this.generateCanvas(toCanvas3, scale),
      ]);

      const [imgHeight1, imgHeight2, imgHeight3] = [
        this.calculateImgHeight(canvas1),
        this.calculateImgHeight(canvas2),
        this.calculateImgHeight(canvas3),
      ];

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

  private cleanUpElements(elements: NodeListOf<HTMLElement>) {
    elements.forEach((resumeElement) => {
      const elementsToRemove = resumeElement.querySelectorAll('#remove');
      elementsToRemove.forEach((removeElement) => removeElement.remove());
    });
    const cleanElements = Array.from(elements);
    cleanElements.forEach((elem) => {
      if (elem.clientHeight > 0) {
        elem.style.padding = '.5rem 3rem';
      }
    });

    elements[0].style.paddingTop = '4rem';

    return cleanElements;
  }

  private async generateCanvas(
    container: HTMLElement,
    scale: number,
  ): Promise<HTMLCanvasElement> {
    return html2canvas(container, { scale });
  }

  private calculateImgHeight(canvas: HTMLCanvasElement): number {
    return canvas ? (canvas.height * 210) / canvas.width : 0;
  }
}

// const pdf = new jsPDF({});
// const toCanvas1 = document.querySelector('#toCanvas1') as HTMLElement;
// const toCanvas2 = document.querySelector('#toCanvas2') as HTMLElement;
// const toCanvas3 = document.querySelector('#toCanvas3') as HTMLElement;

// const maxHeight = (window.innerHeight / 607) * 2100;

// let count = 0;
// let firstPageComplete = false;
// let secondPageComplete = false;
// let threePageComplete = false;
// let paddingToSecondPage = false;
// let paddingToThirdtPage = false;

// const elements = document.querySelectorAll(
//   '#resume',
// ) as NodeListOf<HTMLElement>;

// elements.forEach((resumeElement) => {
//   const elementsToRemove = resumeElement.querySelectorAll('#remove');

//   elementsToRemove.forEach((removeElement) => {
//     removeElement.remove();
//   });
// });

// const elementsArray = Array.from(elements);

// elementsArray.forEach((elem) => {
//   if (elem.clientHeight > 0) {
//     elem.style.padding = '.5rem 3rem';
//   }
// });

// elementsArray[0].style.paddingTop = '4rem';

// elementsArray.forEach((elem, i) => {
//   const elemnHeight = elem.clientHeight;

//   count += elemnHeight;

//   if (count > maxHeight) {
//     firstPageComplete = true;
//   }

//   if (count > maxHeight * 1.5) {
//     secondPageComplete = true;
//   }

//   if (count < maxHeight && !firstPageComplete) {
//     toCanvas1.appendChild(elem.cloneNode(true));
//   }

//   if (count < maxHeight * 1.5 && firstPageComplete) {
//     if (!paddingToSecondPage) {
//       elementsArray[i].style.paddingTop = '4rem';
//     }

//     toCanvas2.appendChild(elem.cloneNode(true));
//     paddingToSecondPage = true;
//   }

//   if (secondPageComplete) {
//     if (!paddingToThirdtPage) {
//       elementsArray[i].style.paddingTop = '4rem';
//     }

//     toCanvas3.appendChild(elem.cloneNode(true));
//     paddingToThirdtPage = true;
//   }
// });

// const canvas1 = await html2canvas(toCanvas1, {
//   scale: 2,
// });
// const imgHeight1 = (canvas1.height * 210) / canvas1.width;

// const canvas2 = await html2canvas(toCanvas2, {
//   scale: 2,
// });

// const imgHeight2 = (canvas2.height * 210) / canvas2.width;

// const canvas3 = await html2canvas(toCanvas3, {
//   scale: 2,
// });

// const imgHeight3 = (canvas3.height * 210) / canvas3.width;

// pdf.addImage(
//   canvas1.toDataURL('image/png'),
//   'PNG',
//   0,
//   0,
//   210,
//   imgHeight1,
// );

// if (firstPageComplete) {
//   pdf.addPage();
//   pdf.addImage(
//     canvas2.toDataURL('image/png'),
//     'PNG',
//     0,
//     0,
//     210,
//     imgHeight2,
//   );
// }

// if (secondPageComplete) {
//   pdf.addPage();

//   pdf.addImage(
//     canvas3.toDataURL('image/png'),
//     'PNG',
//     0,
//     0,
//     210,
//     imgHeight3,
//   );
// }

// pdf.save('resume.pdf');
