const mongoose = require("mongoose");
const Schema = mongoose.Schema;

InvoiceRevisionSchema = Schema({
  revisionDate: Date,
  revisionPath: String,
  revisionData:{
    orderRowInfo:[Object],

  }
})


const InvoiceSchema = Schema({
  invoiceNumber = 
  revisions = [InvoiceRevision],
});




module.exports = mongoose.model(InvoiceSchema);

