const mongoose = require("mongoose");
const colors = require("colors");

//function that connects to mongoDB database
//mongoDB URI stored in .env file
//message will be logged in console when mongoDB is connected

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
