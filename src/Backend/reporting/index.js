

const XLSX = require('xlsx');
const TEMPLATE_PATH = '.\\templates\\'
const INVOICE_TEMPLATE_NAME = 'invoice.template.xls';
const REPORT_TEMPLATE_NAME = 'report.template.xls';
const BASE_SAVE_PATH = __dirname + '\\exports\\';

const invoiceCellCoords = {
  NAME: "A7",
  ORDER_START:'A13',
  ORDER_END: 'A19',
  TAX: '0',
  DELIVERY: '0',
  TOTAL : '0'
}

function modifyCellValue(cell, value){
  cell.v = value;
  cell.w = undefined;
}

export class ExcelCreator{
  constructor(fileName, saveDirectory){
    this.savePath = BASE_SAVE_PATH + saveDirectory + '\\' + fileName;
  }

  async _loadTemplate(templateName){
    console.log('loading template');
    console.log(this);
    let testTemplate = XLSX.readFile("E:\\BakeryDB\\templates\\Book1.xlsx");
    // XLSX.writeFile(testTemplate,"E:\\BakeryDB\\templates\\OutTest.xlsx");
    return testTemplate;
    // this.template = await workbook.xlsx.readFile(TEMPLATE_PATH + templateName);
  }


  save(){

  }
}



export class InvoiceCreator extends ExcelCreator{
  constructor(order){
    super(order.customer.name +'_'+ order._id + '.xls', 'invoices');
    this.order = order;
    this.template = this._loadTemplate(INVOICE_TEMPLATE_NAME);
    console.log(this.template);
    this.invoiceSheet = []
    // this.invoiceSheet = this.template.Sheets['Sheet1']
    this._createInvoice();
  }

  _fillCustomerData(){
    let customerInfo = this.order.customer;
    modifyCellValue(invoiceCellCoords.NAME, "Sean Kelly");
  }

  _fillOrderData(){

  }

  _createInvoice(){
    if(!this.template){
      console.error('template not loaded');
      return null
    }
    this._fillCustomerData();
    this._fillOrderData();
  }
}



export class SalesReportCreator extends ExcelCreator{
  constructor(reportData, fileName='salesReportTest'){
    super(fileName)
    this.reportData = reportData;
    this.template = this._loadTemplate(REPORT_TEMPLATE_NAME);
  }

  _createSalesReport(){

  }
}


let testOrder = {
  _id: '10000',
  customer: {
    name: 'Sean'
  }
}

let testInvoice = new InvoiceCreator(testOrder)
