// Mongoose Sequence Counter used to calculate Invoice Numbers

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterSchema = Schema({
  counterName: String,
  seq: Number,
});

const Counter = mongoose.model("counter", CounterSchema);

async function createCounter(name) {
  let c = new Counter({ counterName: name, seq: 1 });
  return c.save();
}

function checkifCounterExists(counter) {
  return Counter.exists({ counterName: counter });
}

async function getValueAndUpdate(counterName) {
  let counterExists = await checkifCounterExists(counterName);
  if (!counterExists) {
    await createCounter(counterName);
  }
  return Counter.findOneAndUpdate({ counterName }, { $inc: { seq: 1 } })
    .select("counterName seq -_id")
    .lean();
}



async function getValue(counterName) {
  return Counter.findOne({ counterName })
    .lean()
    .catch((e) => console.log(e));
}

module.exports = {
  getValue,
  getValueAndUpdate,
  createCounter,
  checkifCounterExists,
};
