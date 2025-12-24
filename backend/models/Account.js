const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  type: { type: String, enum: ['savings', 'checking', 'credit']},
  color: { type: String, default: '#000000' },
});

module.exports = mongoose.model('Account', accountSchema);