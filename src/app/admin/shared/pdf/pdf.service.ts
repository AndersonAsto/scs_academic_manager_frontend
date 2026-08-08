import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any)['vfs'] = (pdfFonts as any).pdfMake?.vfs ?? (pdfFonts as any).vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  download(docDefinition: any, filename: string) {
    pdfMake.createPdf(docDefinition).download(filename);
  }

  open(docDefinition: any) {
    pdfMake.createPdf(docDefinition).open();
  }

}