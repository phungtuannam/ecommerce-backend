const { default: mongoose } = require("mongoose");

const connectString = "mongodb://localhost:27017/shopdev";

mongoose
  .connect(connectString, {maxPoolSize: 50})
  .then((_) => {
    console.log("Connect Mongodb Successfully");
  })
  .catch((err) => console.log("Err connect"));

  if(1 === 1) {
    mongoose.set('debug',true),
    mongoose.set('debug',{color: true})
  }

  module.exports = mongoose