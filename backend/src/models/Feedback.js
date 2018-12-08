const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { EmployeeSchema } = require('../models/Employee');
const { ManagerSchema } = require('../models/Manager');

const FeedbackSchema = new mongoose.Schema({
  employee: {
    type: EmployeeSchema,
  },
  manager: {
    type: ManagerSchema,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  rate: {
    type: Number,
    default: 0,
    min: 1,
    max: 5,
  },
});

FeedbackSchema.plugin(timestamp);

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
