const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
});

EmployeeSchema.plugin(timestamp);

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
