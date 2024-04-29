const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var schema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  openDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  submitter: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // enum: ["Issue", "Request", "Incident"],
    // required: true,
  },

  url: {
    type: String,
  },
  priority: {
    type: String,
  },
  issueType: {
    type: String,
    required: true,
  },
  issueFrom: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  impactedCourses: {
    type: String, // Adjust the type according to your data type
  },
  userDevice: {
    type: String, // Adjust the type according to your data type
  },
  operatingSystem: {
    type: String, // Adjust the type according to your data type
  },

  details: {
    type: String,
  },
  attachments: [
    {
      filename: String,
      path: String,
    },
  ],

  assignTo: {
    type: [String],
  },
  // otherAssignee: {
  //   type: String,
  // },
  solution: {
    type: String,
  },
});
// Apply the pagination plugin to your schema
schema.plugin(mongoosePaginate);

const IMTdb = mongoose.model("IMTdb", schema);

module.exports = IMTdb;
