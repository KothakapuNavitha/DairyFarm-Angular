import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  public exportAsExcelFile(rowData: any[], excelFileName: string):void {
    console.log(rowData);

    const filteredData = rowData.map((row: any) => {
      return {
        clientId: row.clientId,
        // clientName: row.clientName,
        date: row.date,
        milkType: row.milkType,
        session: row.session,
        quantity: row.quantity,
        pricePerLiter: row.pricePerLiter,
        snf: row.snf,
        fat: row.fat,
        totalPrice: row.totalPrice
      };
    });
    const worksheet: XLSX.WorkSheet=XLSX.utils.json_to_sheet(filteredData);
    const workbook: XLSX.WorkBook={Sheets:{'data1': worksheet }, SheetNames: ['data1']};
    const excelBuffer: any=XLSX.write(workbook,{bookType:'xlsx', type: 'array'});

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob=new Blob([buffer], {type: EXCEL_TYPE });

    FileSaver.saveAs(data,fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
