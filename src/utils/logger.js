let colorReset = '\x1b[0m';
let stringInjector = "%s";
let color = "\x1b[36m";


function colorConsole(color,arg){
  console.log(color+stringInjector+colorReset,arg)
}

module.exports = {
  logger(arg){
    console.log("[LOGGER] ", arg)
  },
  logAttr(arg){
    let message = " [ATTRIBUTES]\n " + " [TYPE] " + typeof(arg) +"\n  [VALUE] " + arg
    colorConsole(color,message);
  }
}