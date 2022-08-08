const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expired: {
        type: String,
        required: true,
        enum: ['EXPIRED', 'NOT_EXPIRED'],
        default: 'NOT_EXPIRED',
    }
})

module.exports = mongoose.model('testModel', testSchema)