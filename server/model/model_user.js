const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },

  fullName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  title: {
    type: String,
  },
  isAdmin: {
    type: String,
   
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
