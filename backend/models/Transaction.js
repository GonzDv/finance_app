const mongoose = require('mongoose');
  

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { 
        type: String, 
        enum: ['income', 'expense', 'transfer'], 
        required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
        account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
        destinationAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
        date: { type: Date, default: Date.now },
    });

module.exports = mongoose.model('Transaction', transactionSchema);