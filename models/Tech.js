const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., 'Frontend', 'Backend', 'Database'
    default: 'General'
  },
  iconUrl: {
    type: String,
    default: ''
  },
  proficiency: {
    type: Number, // 1 to 100
    default: 100
  }
}, { timestamps: true });

module.exports = mongoose.model('Tech', techSchema);
