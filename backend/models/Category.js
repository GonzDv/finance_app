const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    budget: { type: Number },
    spent: { type: Number, default: 0 },
    icon: { type: String, },
});

module.exports = mongoose.model('Category', CategorySchema);
