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
  
      // Adding a title
      doc.text('Purchase Details', 10, 10);
      const formattedData = rowData.map(item => colDefs.map(col => item[col]));

  
      // AutoTable settings
      (doc as any).autoTable({
        head:  [colDefs],    // Column Headers
        body: rowData,         // Table Data
        startY: 20          // Start position of the table
      });
  
      // Save the PDF
      doc.save(`${fileName}.pdf`);
    }
}

