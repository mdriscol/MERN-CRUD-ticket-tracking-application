const mongoose = require("mongoose");

const connectUserDB = async () => {
  try {
    // mongodb connection string for the user database
    const con = await mongoose.connect(process.env.USER_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`User database connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectUserDB;
