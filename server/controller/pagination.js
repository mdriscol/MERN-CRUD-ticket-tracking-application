const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


const paginationSchema = new mongoose.Schema({
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },

});

paginationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Pagination", paginationSchema);
