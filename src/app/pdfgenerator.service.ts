import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {
  generatePdf(colDefs: string[], rowData: any[], fileName: string) {
      const doc = new jsPDF();

      doc.text('Purchase Details', 10, 10);
      const formattedData = rowData.map(item => colDefs.map(col => item[col]));

      (doc as any).autoTable({
        head:  [colDefs],
        body: formattedData,
        startY: 20
      });

      doc.save(`${fileName}.pdf`);
    }
}

