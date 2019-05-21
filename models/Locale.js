const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocaleSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  mhp: {
    type: String
  },
  io_types: {
    id: {
      type: Number
    },
    name: {
      type: String
    },
    daysToClose: {
      type: String
    }
  }
});

module.exports = Locale = mongoose.model("locale", LocaleSchema);
