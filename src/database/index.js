const debug = require("debug")("network:database");
const mongoose = require("mongoose");

const connectToDataBase = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(new Error(`You can't connect a database: ${error.message}`));
        return;
      }
      debug("You're connected to the database");
      resolve();
    });
  });

module.exports = connectToDataBase;
