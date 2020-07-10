const moment = require("moment");

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// datetime-local zinput does not like the default ISO format of date, so I have to format it with moment
function formatDateTime(date) {
  return moment(date).format("YYYY-MM-DDTHH:mm");
}

function calculateTax(subtotal, taxRate) {
  let taxAmount = subtotal * taxRate;
  return parseFloat(taxAmount.toFixed(2));
}

// generates a random number between given minimum and maximum
function getRand(max, min = 0, floor = true) {
  if(floor){
    return Math.floor((Math.random() * max) + min);
  }
  return (Math.random() * max) + min
}




function flattenObject(obj){
  let res = {};
  for(let field in obj){
    if(typeof(obj[field]) != 'object' || Array.isArray(obj[field])){
      res[field] = obj[field];
    }
    else{
      let flattened = flattenObject(obj[field]);
      for(let subField in flattened){
        res[`${field}.${subField}`] = flattened[subField]; 
      }
    }
  }
  return res;
}

// generates a random date between a start and end date
function getRandDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}



// runs a given callback a set amount of times and returns the results in an array
function accum(limit,cb){
  let accum = [];
  for(let i = 0; i < limit; i++){
    accum.push(cb());
  }
  return accum;
}


// generates a random price between .50 and 10.00
function getRandPrice() {
  return getRand(10, 0.5, false).toFixed(2);
}

module.exports = {
  accum,
  capitalizeFirstLetter,
  formatDateTime,
  calculateTax,
  getRand,
  getRandDate,
  flattenObject,
  getRandPrice,
};
