const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

ManagerSchema.plugin(timestamp);

const Manager = mongoose.model('Manager', ManagerSchema);
module.exports = {
  Manager,
  ManagerSchema
};
