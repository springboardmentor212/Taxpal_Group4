const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connection = mongoose.createConnection(process.env.MONGODB_URI);
    connection.once("open", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.error("Error connecting to the database", err);
      process.exit(1);
    });
    return connection;
  } 
  catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1);
  }
};
module.exports = connectDB;