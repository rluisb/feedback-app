const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const FeedbackSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  rate: {
    type: Number,
    default: 0,
    min: 1,
    max: 5
  }
})

FeedbackSchema.plugin(timestamp)

const Feedback = mongoose.model('Feedback', FeedbackSchema)
module.exports = Feedback
