const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  industry: {
    type: String,
  },
  number_of_employees: {
    type: Number,
  },
  locations: [String],
});

const CompanyModel = mongoose.model("Company", CompanySchema);

module.exports = CompanyModel;
